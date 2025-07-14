// src/usuarios/usuarios.service.ts
import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable de NestJS
import { PrismaService } from 'src/prisma/prisma.service'; // Importa el servicio Prisma para acceder a la base de datos
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto'; // Importa el módulo crypto para generar tokens
import * as bcrypt from 'bcrypt'; // Importa el módulo bcrypt para hashear contraseñas
import { EmailService } from './email.service';

@Injectable() // Decorador que marca esta clase como un servicio que puede ser inyectado
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService
  ) {} // Inyección del servicio Prisma

  async register(data: CreateUserDto) {
    try {
      // 1. Verificar si el usuario ya existe por email
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new HttpException('El usuario ya existe.', HttpStatus.CONFLICT);
      }

      // 2. Verificar que las contraseñas coincidan
      if (data.password !== data.confirmPassword) {
        throw new HttpException(
          'Las contraseñas no coinciden.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // 3. Hashear la contraseña
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // 4. Crear usuario SOLO con los campos del formulario
      const newUser = await this.prisma.user.create({
        data: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          password: hashedPassword,
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
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      return user;
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
    return this.prisma.user.update({
      where: { id }, // Especifica el usuario a actualizar por ID
      data, // Proporciona los nuevos datos
    });
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - El ID del usuario a eliminar.
   * @returns El usuario eliminado.
   */
  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } }); // Llama al método delete para eliminar el usuario por ID
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
    await this.emailService.sendPasswordResetEmail(user.email, user.resetPasswordToken);

    return { message: 'Si el email existe, recibirás un enlace de reseteo' };
    
  }

  /**
   * Restablece la contraseña de un usuario.
   * @param token - El token de restablecimiento de contraseña.
   * @param newPassword - La nueva contraseña del usuario.
   * @returns Un mensaje de confirmación.
   */
  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gte: new Date(), // Verifica que el token no haya expirado
        },
      },
    });

    if (!user) {
      throw new HttpException('Token inválido o expirado', HttpStatus.BAD_REQUEST);
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

  async sendEmailConfirmation(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    user.emailConfirmationToken = crypto.randomBytes(32).toString('hex'); // Genera un token aleatorio
    await this.prisma.user.update({
      where: { email },
      data: { emailConfirmationToken: user.emailConfirmationToken },
    });

    // Enviar email de confirmación
    await this.emailService.sendEmailConfirmation(user.email, user.emailConfirmationToken);

    return { message: 'Se ha enviado un email de confirmación' };
  }

  async confirmEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        emailConfirmationToken: token,
      },
    });

    if (!user) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailConfirmed: true, // Marca el email como confirmado
        emailConfirmationToken: null, // Limpia el token de confirmación
      },
    });

    return { message: 'Email confirmado exitosamente' };
  }
}
