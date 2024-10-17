import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCellDto {
  @ApiProperty({ description: 'nombre de la celula' })
  readonly name: string;

  @ApiProperty({ description: 'esta activo' })
  readonly is_active: boolean;

  @ApiProperty({ description: 'id de module' })
  readonly module_id: string;
}

export class UpdateCellDto {
  @ApiProperty({ description: 'nombre de la celula' })
  readonly name?: string;

  @ApiProperty({ description: 'esta activo' })
  readonly is_active?: boolean;

  @ApiProperty({ description: 'id de module' })
  readonly module_id?: string;
}
