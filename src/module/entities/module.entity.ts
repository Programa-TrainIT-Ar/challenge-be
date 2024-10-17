import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";
import { CellEntity } from "src/cell/entities/cell.entity";

export class ModuleEntity {
    @ApiProperty({ description: 'id del modulo' })
    id: UUID;
  
    @ApiProperty({ description: 'nombre del modulo' })
    name: string;
  
    @ApiProperty({
      description: 'estado del modulo: activo o inactivo',
      default: true,
    })
    is_active: boolean;
    
    @ApiProperty()
    created_at: Date;
    
    @ApiProperty()
    updated_at: Date;
}

export class ModuleEntityNested {
    @ApiProperty({ description: 'id del modulo' })
    id: UUID;
  
    @ApiProperty({ description: 'nombre del modulo' })
    name: string;
  
    @ApiProperty({
      description: 'estado del modulo: activo o inactivo',
      default: true,
    })
    is_active: boolean;
    
    @ApiProperty()
    created_at: Date;
    
    @ApiProperty()
    updated_at: Date;
    
    @ApiProperty({ 
        type: () => CellEntity,
        isArray: true,
        description: 'Array de células asociadas al módulo'
    })
    cell: CellEntity[];
}
