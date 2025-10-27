// src/usuarios/usuarios.service.ts
import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable de NestJS
import { PrismaService } from 'src/prisma/prisma.service'; // Importa el servicio Prisma para acceder a la base de datos
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Importa el servicio HTTP para realizar peticiones externas
import * as crypto from 'crypto'; // Importa el módulo crypto para generar tokens
import * as bcrypt from 'bcrypt'; // Importa el módulo bcrypt para hashear contraseñas
import { EmailService } from './email.service';
import { LoginDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable() // Decorador que marca esta clase como un servicio que puede ser inyectado
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService, // Inyecta el servicio HTTP para realizar peticiones externas
    private readonly jwtService: JwtService,
  ) {} // Inyección del servicio Prisma

  private static REGEX_PASSWORD =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/; // Expresión regular para validar contraseñas

  private validatePassword(password: string): boolean {
    // Verifica si la contraseña cumple con los requisitos
    if (!UserService.REGEX_PASSWORD.test(password)) {
      throw new HttpException(
        'La contraseña no cumple con los requisitos.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  /**
   * Registra o gestiona la solicitud de un usuario.
   * Utiliza upsert para crear el usuario si no existe, o actualizar el token si ya existe.
   * Envía un correo de confirmación.
   * @param data - Los datos del usuario a registrar.
   * @returns El estado de la acción (login, pending, sent).
   */
  async registerUser(data: CreateUserDto) {
    const { email, first_name } = data;
    try {
      // 1. Verificar existencia del usuario (solo una lectura inicial)
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          // Seleccionar solo los campos necesarios
          emailConfirmed: true,
          emailConfirmationToken: true,
          emailConfirmationExpires: true,
        },
      });

      // 2. Comprobación Rápida: Usuario ya confirmado
      if (user && user.emailConfirmed) {
        return {
          action: 'login',
          message: 'El correo ya ha sido confirmado. Inicia sesión.',
        };
      }

      const now = new Date();
      // Definir el límite de tiempo para reenviar
      const RESEND_LIMIT_MS = 15 * 60 * 1000; //(15 minutos  en este caso)

      // 3. Comprobación Rápida: Token Vigente (Recientemente enviado)
      // Comprueba si ya existe un token que aún no ha expirado y no han pasado RESEND_LIMIT_MS desde su emisión
      if (
        user &&
        user.emailConfirmationExpires &&
        user.emailConfirmationExpires.getTime() >
          now.getTime() - RESEND_LIMIT_MS // Usar un límite de tiempo más corto para evitar spam
      ) {
        return {
          action: 'pending',
          message:
            'Ya se ha enviado un correo de confirmación. Revisa tu bandeja.',
        };
      }

      // 4. Generar nuevo token y expiración
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(now.getTime() + 60 * 60 * 1000); //(1 hora para expirar)

      // 5. UNA SOLA OPERACIÓN DB: Registrar/Actualizar usando upsert
      //Si el usuario no existía, lo crea. Si existe, actualiza el nuevo token de confirmación
      await this.prisma.user.upsert({
        where: { email },
        update: {
          emailConfirmationToken: token,
          emailConfirmationExpires: expires,
        },
        create: {
          email,
          first_name: first_name,
          emailConfirmed: false,
          emailConfirmationToken: token,
          emailConfirmationExpires: expires,
        },
      });

      // 6. Finalmente, se envía el correo
      await this.emailService.sendEmailConfirmation(email, first_name, token);
      return {
        action: 'verification_sent',
        message:
          'Se ha enviado un nuevo correo de confirmación. Revisa tu bandeja.',
      };
    } catch (error) {
      console.error('Error en registro de usuario: ', error);
      throw new HttpException(
        error.message || 'Error al registrar el usuario',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async registerWithAuth(data: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          birthdate: data.birthdate,
          gender: data.gender,
          photo: data.photo,
          timezone: data.timezone,
          emailConfirmed: true,
        },
      });

      // 5. Retornar al usuario sin la contraseña
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error en registro de usuario:', error);
      throw new HttpException(
        error.message || 'Error al registrar el usuario',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtiene todos los usuarios.
   * @returns Una lista de usuarios.
   */
  async findAll() {
    return this.prisma.user.findMany(); // Llama al método findMany del cliente Prisma para obtener todos los usuarios
  }

  /**
   * Obtiene un usuario por su email.
   * @param email - El email del usuario a buscar.
   * @returns El usuario encontrado o null si no existe.
   */

  async findByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: {
          hardSkills: true,
          roles: true,
        },
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      let register_complete: boolean = false;

      if (
        user.first_name &&
        user.last_name &&
        user.phone_number &&
        user.hardSkills.length > 0 &&
        user.roles.length > 0
      ) {
        register_complete = true;
      }
      return { user, register_complete };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al buscar usuario',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Actualiza un usuario existente por su ID.
   * @param id - El ID del usuario a actualizar.
   * @param data - Los nuevos datos del usuario.
   * @returns El usuario actualizado.
   */
  async update(
    id: string,
    data: {
      email?: string;
      password?: string;
      first_name?: string;
      last_name?: string;
      gender?: string;
      photo?: string;
      phone_number?: string;
      timezone?: string;
      birthdate?: Date;
    },
  ) {
    //Hashear la contraseña antes de enviarla a la BD
    if (data.password) {
      //Si el usuario introdujo una contraseña (como en el caso de accountSetup)
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }

    return this.prisma.user.update({
      where: { id }, // Especifica el usuario a actualizar por ID
      data, // Proporciona los nuevos datos
      select: {
        //Devolver sólo los datos de la entidad User que se necesitarán
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        phone_number: true,
      },
    });
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - El ID del usuario a eliminar.
   * @returns El usuario eliminado.
   */
  async remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { is_active: false },
    }); // cambia el estado del usuario a inactivo en lugar de eliminarlo físicamente
  }

  /**
   * Solicita el restablecimiento de contraseña para un usuario.
   * @param email - El email del usuario para solicitar el restablecimiento de contraseña.
   * @returns Un mensaje de confirmación.
   */
  async requestPasswordReset(email: string) {
    // 1. Generar token y expiración
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hora

    // 2. Intentar actualizar el usuario (si existe)
    try {
      const user = await this.prisma.user.update({
        where: {
          email,
          // Lógica de Condición: SOLO actualizar si el token ha expirado o no existe.
          OR: [
            { resetPasswordExpires: null }, // El token nunca ha sido generado
            { resetPasswordExpires: { lte: new Date() } }, // El token ya expiró
          ],
        },
        data: {
          resetPasswordToken: token,
          resetPasswordExpires: expires,
        },
        // Seleccionar los datos necesarios para el email
        select: {
          id: true,
          email: true,
          first_name: true,
          resetPasswordToken: true,
        },
      });

      // 3. Enviar email (solo si la actualización fue exitosa)
      await this.emailService.sendPasswordResetEmail(
        user.email,
        user.first_name,
        token, // Se usa la variable 'token' generada
      );

      // 4. PRÁCTICA DE SEGURIDAD: MENSAJE GENÉRICO
      return { message: 'Si el email existe, recibirás un enlace de recuperación.' };
    } catch (error) {

      // El error P2025 de Prisma puede ocurrir por dos razones:
        // A) El email no existe.
        // B) El email existe, pero la cláusula 'where' no se cumplió 
        //    (es decir, el token aún era VÁLIDO y por lo tanto NO SE HIZO el update).

      // Se maneja el caso de que el usuario NO exista (Prisma lanzará un error)
      if (error.code === 'P2025' || error.status === 404) {
        // Si no se hizo el update, debemos verificar si fue por token válido o email no existente.
        const user = await this.prisma.user.findUnique({
          where: { email },
          select: {
            email: true,
            first_name: true,
            resetPasswordToken: true,
            resetPasswordExpires: true,
          },
        });
        if (
          user &&
          user.resetPasswordToken &&
          user.resetPasswordExpires > new Date()
        ) {
          // Caso B: El token EXISTE y es VÁLIDO
           return { message: 'El enlace de recuperación anterior no ha expirado. Revisa tu bandeja de entrada.' };
        } else {
          // Caso A: El email no existe o existe pero no tiene token válido (pero la primera
          // consulta ya falló, lo cual es inusual si la lógica inicial fue correcta).
          // En este punto, por seguridad, se devuelve el mensaje genérico.
          console.warn(
            `Intento de restablecimiento para email no encontrado o fallo inesperado: ${email}`,
          );
          return { message: 'Si el email existe, recibirás un enlace de recuperación.' };
        }
      } else {
        // Error interno no relacionado.
        throw new HttpException(
          'Error interno al solicitar reseteo.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      // throw new HttpException('Error interno al solicitar reseteo.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Restablece la contraseña de un usuario.
   * @param token - El token de restablecimiento de contraseña.
   * @param newPassword - La nueva contraseña del usuario.
   * @returns Un mensaje de confirmación.
   */
  async resetPassword(
    token: string,
    newPassword: string,
    confirmNewPassword: string,
  ) {
    this.validatePassword(newPassword);
    if (newPassword !== confirmNewPassword) {
      throw new HttpException(
        'Las contraseñas no coinciden',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gte: new Date(), // Verifica que el token no haya expirado
        },
      },
    });

    if (!user) {
      throw new HttpException(
        'Token inválido o expirado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hashea la nueva contraseña

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null, // Limpia el token de restablecimiento
        resetPasswordExpires: null, // Limpia la fecha de expiración
      },
    });

    return { message: 'Contraseña restablecida exitosamente' };
  }

  async confirmEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        emailConfirmationToken: token,
        emailConfirmationExpires: {
          gte: new Date(), // Verifica que el token no haya expirado
        },
      },
    });

    if (!user) {
      throw new HttpException(
        'Token inválido o vencido',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailConfirmed: true, // Marca el email como confirmado
        emailConfirmationExpires: null, // Limpia la fecha de expiración
        emailConfirmationToken: null, // Limpia el token de confirmación
      },
    });

    // Definir la carga útil (payload) para el JWT
    const payload = {
      email: user.email,
      sub: user.id, // 'sub' es un estándar para el ID del usuario en JWT
    };

    // Generar el JWT (Token de Autenticación/Bearer Token)
    const accessToken = this.jwtService.sign(payload);

    //Retornar el token y la información necesaria
    return {
      message: 'Email confirmado y usuario autenticado exitosamente',
      access_token: accessToken, //Este token será usado para permitir al FRONT ingresar los nuevos datos del usuario
      user_id: user.id,
      email: user.email,
      name: user.first_name,
      emailConfirmed: true,
    };
  }

  async loginAuth0(loginDto: LoginDto) {
    const { email, password } = loginDto;
    console.log('Login attempt for email:', email);
    const domain = this.configService.get<string>('AUTH0_DOMAIN');
    const clientId = this.configService.get<string>('CLIENT_ID');
    const clientSecret = this.configService.get<string>('CLIENT_SECRET');
    const audience = this.configService.get<string>('AUTH0_AUDIENCE');
    if (!domain || !clientId || !clientSecret || !audience) {
      throw new HttpException(
        'Configuración de autenticación no encontrada',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const body = {
      grant_type: 'password',
      username: email,
      password,
      audience,
      scope: 'openid',
      client_id: clientId,
      client_secret: clientSecret,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(`https://${domain}/oauth/token`, body),
      );
      return response.data;
    } catch (err) {
      throw new HttpException(
        'Las credenciales son inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * Autentica a un usuario usando credenciales de email y contraseña
   * almacenadas localmente.
   * @param loginDto - El DTO con email y password.
   * @returns Un objeto con el token de acceso (JWT).
   */
  async loginLocal(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Buscar el usuario en la DB
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Usuario no existe.', HttpStatus.UNAUTHORIZED);
    }

    if (!user.emailConfirmed) {
      throw new HttpException(
        'El usuario no ha confirmado su correo.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 2. Comparar la contraseña (si el usuario tiene contraseña, es decir, no es un usuario solo de Auth0)
    if (!user.password) {
      throw new HttpException(
        'Usuario registrado con un servicio externo. Usa el inicio de sesión con Google.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Comparación de la contraseña en texto plano con el hash de la DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Credenciales inválidas.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 3. Generar un JSON Web Token (JWT) propio para la sesión local

    //Evaluando rol del usuario para enviarlo en el token
    const role = user.is_superuser ? 'admin' : 'candidato';

    // Se crea el array de roles que imita la estructura de Auth0
    const AUTH0_ROLES_CLAIM = 'https://miaplicacion.com/roles';
    const auth0Roles = [role];

    // Carga útil (Payload) del token
    const payload = {
      email: user.email,
      sub: user.id,
      role: role,
      is_superuser: user.is_superuser,
      [AUTH0_ROLES_CLAIM]: auth0Roles, //// Añadir la custom claim de roles (para estandarizar lógica)
    };

    // Generar el token
    const accessToken = this.jwtService.sign(payload);

    // 4. Retornar el token al frontend
    return {
      access_token: accessToken,
      user_id: user.id,
      email: user.email,
      role: role,
    };
  }
}
