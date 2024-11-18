import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCellDto {
  
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'El campo debe tener al menos 3 caracteres' })
  @ApiProperty({ description: 'nombre de la celula' })
  name: string;

  @IsBoolean()
  @ApiProperty({ description: 'esta activo' })
  is_active: boolean;

  @IsUUID()
  @ApiProperty({ description: 'id de module' })
  module_id: string;
}

export class UpdateCellDto extends PartialType(CreateCellDto){}
