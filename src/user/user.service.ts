// src/usuarios/usuarios.service.ts
import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable de NestJS
import { PrismaService } from 'src/prisma/prisma.service'; // Importa el servicio Prisma para acceder a la base de datos
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // Importa bcrypt para el hash de contraseñas

@Injectable() // Decorador que marca esta clase como un servicio que puede ser inyectado
export class UserService {
  constructor(private readonly prisma: PrismaService) {} // Inyección del servicio Prisma

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
   * @param id - El email del usuario a buscar.
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
}
