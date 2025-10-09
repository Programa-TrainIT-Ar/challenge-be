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

  // async register(data: CreateUserDto) {
  //   try {
  //     // 1. Verificar si el usuario ya existe por email
  //     const existingUser = await this.prisma.user.findUnique({
  //       where: { email: data.email },
  //     });

  //     if (existingUser) {
  //       throw new HttpException('El usuario ya existe.', HttpStatus.CONFLICT);
  //     }

  //     // 2.  Validar la contraseña y verificar que coincidan

  //     this.validatePassword(data.password);
  //     if (data.password !== data.confirmPassword) {
  //       throw new HttpException(
  //         'Las contraseñas no coinciden.',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }

  //     // 3. Hashear la contraseña
  //     const hashedPassword = await bcrypt.hash(data.password, 10);

  //     // 4. Crear usuario SOLO con los campos del formulario
  //     const newUser = await this.prisma.user.create({
  //       data: {
  //         email: data.email,
  //         first_name: data.first_name,
  //         last_name: data.last_name,
  //         phone_number: data.phone_number,
  //         password: hashedPassword,
  //       },
  //     });

  //     // 5. Retornar al usuario sin la contraseña
  //     const { password, ...userWithoutPassword } = newUser;
  //     return userWithoutPassword;
  //   } catch (error) {
  //     console.error('Error en registro de usuario:', error);
  //     throw new HttpException(
  //       error.message || 'Error al registrar el usuario',
  //       error.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

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
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

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
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    user.resetPasswordToken = crypto.randomBytes(32).toString('hex'); // Genera un token aleatorio
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // Establece la expiración del token a 1 hora

    await this.prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: user.resetPasswordToken,
        resetPasswordExpires: user.resetPasswordExpires,
      },
    });

    // Enviar email con el enlace
    await this.emailService.sendPasswordResetEmail(
      user.email,
      user.resetPasswordToken,
    );

    return { message: 'Si el email existe, recibirás un enlace de reseteo' };
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

  async sendEmailConfirmation(email: string, name: string) {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (user && user.emailConfirmed) {
      // Ya confirmado → login
      return {
        action: 'login',
        message: 'El correo ya ha sido confirmado. Inicia sesión.',
      };
    }

    const now = new Date();

    if (
      user &&
      user.emailConfirmationToken &&
      user.emailConfirmationExpires &&
      user.emailConfirmationExpires > now
    ) {
      return {
        action: 'pending',
        message:
          'Ya se ha enviado un correo de confirmación. Revisa tu bandeja.',
      };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(now.getTime() + 60 * 60 * 1000);

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          first_name: name,
          emailConfirmed: false,
          emailConfirmationToken: token,
          emailConfirmationExpires: expires,
        },
      });
    } else {
      await this.prisma.user.update({
        where: { email },
        data: {
          emailConfirmationToken: token,
          emailConfirmationExpires: expires,
        },
      });
    }
    // Enviar correo de confirmación
    await this.emailService.sendEmailConfirmation(email, name, token);
    return {
      action: 'verification_sent',
      message: 'Se ha enviado un email de confirmación',
    };
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
      throw new HttpException(
        'Credenciales inválidas.',
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

    // Carga útil (Payload) del token
    const payload = {
      email: user.email,
      sub: user.id,
    };

    // Generar el token
    const accessToken = this.jwtService.sign(payload);

    // 4. Retornar el token al frontend
    return {
      access_token: accessToken,
      user_id: user.id,
      email: user.email,
    };
  }
}
