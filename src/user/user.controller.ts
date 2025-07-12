import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../authorization/roles/roles.decorator';
import { RolesGuard } from 'src/authorization/roles/roles.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //registra un nuevo usuario
  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al registrar el usuario.',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.register(createUserDto);
      return {
        statusCode: 201,
        message: 'Usuario registrado exitosamente.',
        user,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al registrar el usuario.',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Obtiene todos los usuarios.
   * @returns Una lista de usuarios.
   */
  @Get() // Define la ruta para obtener todos los usuarios
  //@UseGuards(AuthorizationGuard) // Solo requiere autorización
  @ApiOperation({ summary: 'Obtener todos los usuarios' }) // Resumen de la operación para Swagger
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' }) // Respuesta esperada en caso de éxito
  async findAll() {
    return this.userService.findAll(); // Llama al servicio para obtener todos los usuarios
  }

  @Get('FindByEmail')
  // @UseGuards(AuthorizationGuard) // Agregar el guard de autorización
  @ApiOperation({ summary: 'Buscar usuario por email' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async findByEmail(@Query('email') email: string) {
    try {
      const user = await this.userService.findByEmail(email);
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
  @Put(':id') // Define la ruta para actualizar un usuario por ID
  //@UseGuards(AuthorizationGuard, RolesGuard) // Requiere autorización y verificación de roles
  @Roles('admin') // Solo permite a los administradores
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() data: CreateUserDto, // Puedes usar el DTO si es aplicable
  ) {
    return this.userService.update(id, data); // Llama al servicio para actualizar el usuario por ID
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - El ID del usuario a eliminar.
   * @returns Mensaje de confirmación.
   */
  @Delete(':id') // Define la ruta para eliminar un usuario por ID
  @UseGuards(AuthorizationGuard, RolesGuard) // Requiere autorización y verificación de roles
  @Roles('admin') // Solo permite a los administradores
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return {
      message: 'Usuario eliminado exitosamente.',
    };
  }
}
