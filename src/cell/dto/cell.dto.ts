import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ModuleDto } from 'src/module/dto/module.dto';

export class CreateCellDto {
  @ApiProperty({ description: 'nombre de la celula' })
  readonly name: string;

  @ApiProperty({ description: 'esta activo' })
  readonly is_active: boolean;

  @ApiProperty({ description: 'id de module' })
  readonly module_id: string;

  // @ApiPropertyOptional({ type:[SkillLevelDto],description: 'niveles de habilidad asociados' })
  //readonly skill_level?:SkillLevelDto[];
}

export class UpdateCellDto {
  @ApiProperty({ description: 'nombre de la celula' })
  readonly name?: string;

  @ApiProperty({ description: 'esta activo' })
  readonly is_active?: boolean;

  @ApiProperty({ description: 'id de module' })
  readonly module_id?: string;

  // @ApiPropertyOptional({ type:[SkillLevelDto],description: 'niveles de habilidad asociados' })
  //readonly skill_level?:SkillLevelDto[];
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

  // @ApiProperty({ description: 'niveles habilidad asociado',type:[SkillLevelDto] })
  //readonly skill_level: SkillLevelDto[];
}
