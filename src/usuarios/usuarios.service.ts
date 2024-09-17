// src/usuarios/usuarios.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany(); // Usa el nombre correcto del modelo
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: { 
    email: string; 
    password: string; 
    first_name: string; 
    last_name: string; 
    gender: string; 
    photo?: string; 
    phone_number?: string; 
    timezone?: string; 
    birthdate: Date 
  }) {
    return this.prisma.user.create({ data });
  }

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
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
