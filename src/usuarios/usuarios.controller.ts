import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@UseGuards(AuthorizationGuard)
@ApiTags('User')
@Controller('user')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  async findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al crear el usuario.' })
  async create(@Body() data: {
    email: string; 
    password: string; 
    first_name: string; 
    last_name: string; 
    gender: string; 
    photo?: string; 
    phone_number?: string; 
    timezone?: string; 
    birthdate: Date;
  }) {
    return this.usuariosService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async update(@Param('id') id: string, @Body() data: {
    email?: string; 
    password?: string; 
    first_name?: string; 
    last_name?: string; 
    gender?: string; 
    photo?: string; 
    phone_number?: string; 
    timezone?: string; 
    birthdate?: Date;
  }) {
    return this.usuariosService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
