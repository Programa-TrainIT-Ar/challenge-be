import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateModuleDto {
  @ApiProperty({ description: 'nombre del modulo' })
  readonly name: string;
  @ApiPropertyOptional({ description: 'estado del modulo: activo o inactivo' })
  readonly is_active?: boolean;
}

export class UpdateModuleDto extends PartialType(CreateModuleDto){}
