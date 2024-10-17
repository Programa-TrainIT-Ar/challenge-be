import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common'; // Importa decoradores y tipos de NestJS
import { UserService } from './user.service'; // Importa el servicio de usuarios
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa decoradores para la documentación Swagger
import { AuthorizationGuard } from 'src/authorization/authorization.guard'; // Importa el guardia de autorización
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../authorization/roles/roles.decorator'; // Importa el decorador de roles
import { RolesGuard } from 'src/authorization/roles/roles.guard'; // Importa el guardia de roles

@ApiTags('User') // Etiqueta para agrupar las rutas en la documentación de Swagger
@Controller('user') // Define el controlador con la ruta base 'user'
export class UserController {
  constructor(private readonly userService: UserService) {} // Inyección del servicio de usuarios

  /**
   * Obtiene todos los usuarios.
   * @returns Una lista de usuarios.
   */
  @Get() // Define la ruta para obtener todos los usuarios
  @UseGuards(AuthorizationGuard) // Solo requiere autorización
  @ApiOperation({ summary: 'Obtener todos los usuarios' }) // Resumen de la operación para Swagger
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' }) // Respuesta esperada en caso de éxito
  async findAll() {
    return this.userService.findAll(); // Llama al servicio para obtener todos los usuarios
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id - El ID del usuario a buscar.
   * @returns El usuario encontrado.
   */
  @Get(':id') // Define la ruta para obtener un usuario por ID
  @UseGuards(AuthorizationGuard) // Solo requiere autorización
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id); // Llama al servicio para obtener el usuario por ID
  }

  /**
   * Crea un nuevo usuario.
   */
  @Post()
  @ApiOperation({ summary: 'Crear o autenticar un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario autenticado o registrado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear o autenticar el usuario.',
  })
  async create(@Body() data: CreateUserDto) {
    try {
      const result = await this.userService.create(data);
      return result; // Devuelve el mensaje y el usuario si corresponde
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  }

  /**
   * Actualiza un usuario existente por su ID.
   * @param id - El ID del usuario a actualizar.
   * @param data - Los nuevos datos del usuario.
   * @returns El usuario actualizado.
   */
  @Put(':id') // Define la ruta para actualizar un usuario por ID
  @UseGuards(AuthorizationGuard, RolesGuard) // Requiere autorización y verificación de roles
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
