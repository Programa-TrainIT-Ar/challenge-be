import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ModuleDto } from 'src/module/dto/module.dto';

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

export class CellDto {
  @ApiProperty({ description: 'id de la celula' })
  readonly id: string;

  @ApiProperty({ description: 'nombre de la celula' })
  readonly name: string;

  @ApiProperty({ description: 'esta activo' })
  readonly is_active: boolean;

  @ApiProperty({ description: 'module asociado', type: () => ModuleDto })
  readonly module: ModuleDto;
}