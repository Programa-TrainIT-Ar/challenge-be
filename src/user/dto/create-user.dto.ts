import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  @ApiProperty({ description: 'correo electrónico del usuario' })
  email: string;

  @IsString()
  @ApiProperty()
  @ApiProperty({ description: 'nombre del usuario' })
  first_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @ApiProperty({ description: 'apellido del usuario' })
  last_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'foto del usuario', required: false })
  photo?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'género del usuario', required: false })
  gender?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'contraseña del usuario',
    required: false,
    writeOnly: true,
  })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, writeOnly: true })
  confirmPassword?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'número de teléfono del usuario',
    required: false,
  })
  phone_number?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'zona horaria del usuario', required: false })
  timezone?: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty({
    description: 'fecha de nacimiento del usuario',
    required: false,
  })
  birthdate?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'ID externo del proveedor de autenticación (Auth0 sub)',
    required: false,
    example: 'auth0|65c3413...',
  })
  externalId?: string;
}
