import { IsEmail, IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCandidateDto {
  @ApiProperty({ description: 'Email del candidato', example: 'ejemplo@dominio.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña del candidato', example: 'contraseñaSegura' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Nombre del candidato', example: 'Juan' })
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'Apellido del candidato', example: 'Pérez' })
  @IsString()
  last_name: string;

  @ApiProperty({ description: 'Género del candidato', example: 'Masculino' })
  @IsString()
  gender: string;

  @ApiProperty({ description: 'Foto del candidato', example: 'url_de_la_foto', required: false })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ description: 'Número de teléfono del candidato', example: '1234567890', required: false })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ description: 'Zona horaria del candidato', example: 'UTC-5', required: false })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({ description: 'Estado activo del candidato', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ description: 'Fecha de nacimiento del candidato', example: '1990-01-01' })
  @IsDate()
  birthdate: Date;
}
