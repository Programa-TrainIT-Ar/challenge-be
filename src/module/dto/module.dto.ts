import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
//import { CellDto } from 'src/cell/dto/cell.dto';

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

export class ModuleDto {
  @ApiProperty({ description: 'id del modulo' })
  readonly id: string;

  @ApiProperty({ description: 'nombre del modulo' })
  readonly name: string;

  @ApiProperty({
    description: 'estado del modulo: activo o inactivo',
    default: true,
  })
  readonly is_active: boolean;

  // @ApiProperty({
  // description: 'celulas asociadas al module',
  //type: () => [CellDto],
  //})
  // readonly cells: CellDto[];
}
