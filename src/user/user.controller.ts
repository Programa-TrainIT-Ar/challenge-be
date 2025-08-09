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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailDto, TokenDto, TokenWithPasswordDto } from './dto/base.dto';
import { Roles } from '../authorization/roles/roles.decorator';
import { RolesGuard } from 'src/authorization/roles/roles.guard';
import { UserEntity } from './entities/user.entity';
import { LoginDto } from './dto/auth.dto';

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
    type: UserEntity,
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
  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard) //, RolesGuard Requiere autorización y verificación de roles
  //@Roles('admin') // Solo permite a los administradores
  @ApiOperation({ 
    summary: 'Obtener todos los usuarios',
    description: '🔒 **REQUIERE ROL DE ADMINISTRADOR** \n',
  }) // Resumen de la operación para Swagger
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' }) // Respuesta esperada en caso de éxito
  async findAll() {
    return this.userService.findAll(); // Llama al servicio para obtener todos los usuarios
  }

  @Get('FindByEmail')
  @ApiOperation({ summary: 'Buscar usuario por email' })
  @ApiResponse({
    status: 201,
    description: 'Usuario encontrado.',
    type: UserEntity,
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
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Actualiza un usuario existente por su ID.
   * @param id - El ID del usuario a actualizar.
   * @body data - Los nuevos datos del usuario.
   * @returns El usuario actualizado.
   */
  @Put(':id') // Define la ruta para actualizar un usuario por ID
  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard) // Requiere autorización y verificación de roles
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async update(@Param('id') id: string, @Body() data: CreateUserDto) {
    return this.userService.update(id, data); // Llama al servicio para actualizar el usuario por ID
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - El ID del usuario a eliminar.
   * @returns Mensaje de confirmación.
   */
  @Delete(':id') // Define la ruta para eliminar un usuario por ID
  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard) // , RolesGuard Requiere autorización y verificación de roles
  //@Roles('admin') // Solo permite a los administradores
  @ApiOperation({ summary: 'Eliminar un usuario por ID',
    description: '🔒 **REQUIERE ROL DE ADMINISTRADOR** \n'
   }) // Resumen de la operación para Swagger
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
    description:
      'Si el email existe, se enviará un enlace de restablecimiento.',
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
    return this.userService.resetPassword(
      body.token,
      body.password,
      body.confirmPassword,
    );
  }

  @Post('send-email-confirmation')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar confirmación de email' })
  @ApiBody({ type: EmailDto })
  @ApiResponse({
    status: 200,
    description: 'Email de confirmación enviado exitosamente.',
  })
  @HttpCode(HttpStatus.OK)
  async sendEmailConfirmation(@Body() body: EmailDto) {
    return this.userService.sendEmailConfirmation(body.email, body.first_name);
  }

  @Post('confirm-email') // Endpoint para confirmar email
  @ApiBearerAuth()
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

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login exitoso',
    schema: {
      example: {
        access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJS...',
        id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJS...',
        refresh_token: 'v1.M0_Nwz7...',
        expires_in: 86400,
        token_type: 'Bearer',
        user: {
          sub: 'auth0|...',
          email: 'usuario@ejemplo.com',
          name: 'Usuario Ejemplo'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiBody({
    schema: {
      example: {
        email: 'usuario@ejemplo.com',
        password: 'MiPassword123!'
      }
    }
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }
}
