// src/usuarios/usuarios.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Post()
  async create(@Body() data: { 
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
    return this.usuariosService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: { 
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
    return this.usuariosService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
