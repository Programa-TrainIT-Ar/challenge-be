// src/usuarios/usuarios.service.ts
import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable de NestJS
import { PrismaService } from 'src/prisma/prisma.service'; // Importa el servicio Prisma para acceder a la base de datos
import { CreateUserDto } from './dto/create-user.dto';

@Injectable() // Decorador que marca esta clase como un servicio que puede ser inyectado
export class UserService {
  constructor(private readonly prisma: PrismaService) {} // Inyección del servicio Prisma

  /**
   * Obtiene todos los usuarios.
   * @returns Una lista de usuarios.
   */
  async findAll() {
    return this.prisma.user.findMany(); // Llama al método findMany del cliente Prisma para obtener todos los usuarios
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id - El ID del usuario a buscar.
   * @returns El usuario encontrado o null si no existe.
   */
  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } }); // Llama al método findUnique para buscar un usuario por ID
  }

  
  async create(data: CreateUserDto) {
    try {
      console.log('Buscando el usuario', data.email);
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingUser) {
        console.log('el usuario ya existe:',existingUser);
        return {
          user: existingUser,
        };
      }

      const newUser = await this.prisma.user.create({
        data: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          photo: data.photo,
          phone_number: data.phone_number,
          timezone: data.timezone,
          password: data.password, 
          gender: data.gender,
          birthdate: data.birthdate, 
        },
      });

      return {
        message: 'Usuario registrado exitosamente.',
        user: newUser,
      };
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw new Error('No se pudo crear el usuario');
    }
  }
  
  
  /**
   * Actualiza un usuario existente por su ID.
   * @param id - El ID del usuario a actualizar.
   * @param data - Los nuevos datos del usuario.
   * @returns El usuario actualizado.
   */
  async update(id: string, data: { 
    email?: string; 
    password?: string; 
    first_name?: string; 
    last_name?: string; 
    gender?: string; 
    photo?: string; 
    phone_number?: string; 
    timezone?: string; 
    birthdate?: Date 
  }) {
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
