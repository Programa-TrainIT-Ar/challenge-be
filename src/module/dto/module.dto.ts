import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateModuleDto {
  @ApiProperty({ description: 'nombre del modulo' })
  readonly name: string;
  @ApiPropertyOptional({ description: 'estado del modulo: activo o inactivo' })
  readonly is_active?: boolean;
}

export class UpdateModuleDto {
  @ApiProperty({ description: 'nombre del modulo' })
  readonly name?: string;
  @ApiPropertyOptional({ description: 'estado del modulo: activo o inactivo' })
  readonly is_active?: boolean;
}
