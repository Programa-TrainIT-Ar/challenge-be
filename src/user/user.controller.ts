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
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailDto, TokenDto, TokenWithPasswordDto } from './dto/base.dto';
import { Roles } from '../authorization/roles/roles.decorator';
import { RolesGuard } from 'src/authorization/roles/roles.guard';
import { UserEntity } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Get('FindByEmail')
  @UseGuards(AuthorizationGuard) // Agregar el guard de autorización
  @ApiOperation({ summary: 'Buscar usuario por email' })
  @ApiResponse({
      status: 201,
      description: 'Usuario encontrado.',
      type: UserEntity
    })
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
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Obtiene todos los usuarios.
   * @returns Una lista de usuarios.
   */
  @Get() // Define la ruta para obtener todos los usuarios
  @UseGuards(AuthorizationGuard) // Solo requiere autorización
  @ApiOperation({ summary: 'Obtener todos los usuarios' }) // Resumen de la operación para Swagger
  @ApiResponse({
      status: 200,
      description: 'Lista de usuarios.',
      type: [UserEntity], // Tipo de respuesta esperada
    }) // Respuesta esperada en caso de éxito
  async findAll() {
    return this.userService.findAll(); // Llama al servicio para obtener todos los usuarios
  }

    /**
   * Obtiene un usuario por su email.
   * @param email - El email del usuario a buscar.
   * @returns El usuario encontrado.
   */
    @Get(':email') // Define la ruta para obtener un usuario por email
    //@UseGuards(AuthorizationGuard) // Solo requiere autorización
    @ApiOperation({ summary: 'Obtener un usuario por email' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    async findOne(@Param('email') email: string) {
      return this.userService.findOne(email); // Llama al servicio para obtener el usuario por ID
    }

  /**
   * Crea un nuevo usuario.
   */
  @Post()
  @ApiOperation({ summary: 'Crear o autenticar un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario autenticado o registrado.',
    type: CreateUserDto,
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
   * @body data - Los nuevos datos del usuario.
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
    @Body() data: CreateUserDto,
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
 
  @Post('forgot-password') // Endpoint para solicitar restablecimiento de contraseña
  @ApiOperation({ summary: 'Solicitar restablecimiento de contraseña' })
  @ApiBody({ type: EmailDto }) // Define el cuerpo de la solicitud
  @ApiResponse({
    status: 200,
    description: 'Si el email existe, se enviará un enlace de restablecimiento.',
  })
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() body: EmailDto) {
    return this.userService.requestPasswordReset(body.email);
  }

  @Post('reset-password') // Endpoint para restablecer la contraseña
  @ApiOperation({ summary: 'Restablecer la contraseña' })
  @ApiBody({ type: TokenWithPasswordDto }) // Define el cuerpo de la solicitud
  @ApiResponse({
    status: 200,
    description: 'Contraseña restablecida exitosamente.',
  })
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() body: TokenWithPasswordDto) {
    return this.userService.resetPassword(body.token, body.password);
  }
  @Post('send-email-confirmation')
  @ApiOperation({ summary: 'Enviar confirmación de email' })
  @ApiBody({ type: EmailDto })
  @ApiResponse({
    status: 200,
    description: 'Email de confirmación enviado exitosamente.',
  })
  @HttpCode(HttpStatus.OK)
  async sendEmailConfirmation(@Body() body: EmailDto) {
    return this.userService.sendEmailConfirmation(body.email);
  }

  @Post('confirm-email')
  @ApiOperation({ summary: 'Confirmar email' })
  @ApiBody({ type: TokenDto })
  @ApiResponse({
    status: 200,
    description: 'Email confirmado exitosamente.',
  })
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Body() body: TokenDto) {
    return this.userService.confirmEmail(body.token);
  }
}
