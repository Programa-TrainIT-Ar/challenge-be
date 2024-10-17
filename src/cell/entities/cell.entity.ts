import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";
import { ModuleEntity, ModuleEntityNested } from "src/module/entities/module.entity";

export class CellEntity {
    @ApiProperty({ description: 'id de la celula' })
    id: UUID;
  
    @ApiProperty({ description: 'nombre de la celula' })
    name: string;
  
    @ApiProperty({ description: 'esta activo' })
    is_active: boolean;
  
    @ApiProperty({ description: 'module asociado' })
    module_id: UUID;

    @ApiProperty()
    created_at: Date;
    
    @ApiProperty()
    updated_at: Date;
  }
  export class CellEntityNested {
    @ApiProperty({ description: 'id de la celula' })
    id: UUID;
  
    @ApiProperty({ description: 'nombre de la celula' })
    name: string;
  
    @ApiProperty({ description: 'esta activo' })
    is_active: boolean;
  
    @ApiProperty({ description: 'module asociado' })
    module_id: UUID;

    @ApiProperty()
    created_at: Date;
    
    @ApiProperty()
    updated_at: Date;

    @ApiProperty({
      type: () => ModuleEntity,
      description: 'módulo al que pertenece la célula'
    })
    module: ModuleEntity;  
  }