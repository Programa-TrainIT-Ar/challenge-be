import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateModuleDto {
  
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'El campo debe tener al menos 3 caracteres' })
  @ApiProperty({ description: 'nombre del modulo' })
  name: string;
  
  @IsBoolean()
  @ApiPropertyOptional({ description: 'estado del modulo: activo o inactivo' })
  is_active?: boolean;
}

export class UpdateModuleDto extends PartialType(CreateModuleDto){}
