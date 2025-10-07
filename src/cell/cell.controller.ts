import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CellService } from './cell.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCellDto, UpdateCellDto } from './dto/cell.dto';
import { CellEntity } from './entities/cell.entity';
import { Cell } from '@prisma/client';

@ApiTags('Cell')
@Controller('cells')
export class CellController {
  constructor(private readonly cellService: CellService) {}

  @Get()
  @ApiOperation({ summary: 'obtener todas las celulas' })
  @ApiResponse({
    status: 201,
    description: 'retornar todas las celulas',
    type: CellEntity,
    isArray: true,
  })
  async getAllCells(
    // Se extrae el valor string de los queries
    @Query('is_active') is_active_str: string,
    @Query('has_quizzes') has_quizzes_str: string,
  ): Promise<Cell[]> {
    // Convertir los strings de los query params a booleanos
    // Se convierte el string 'true' a booleano true. Si no es 'true' (es 'false', undefined, o cualquier cosa), se convierte a undefined para no aplicar el filtro.
    const is_active = is_active_str === 'true' ? true : undefined;
    const has_quizzes = has_quizzes_str === 'true' ? true : undefined;

    const filters = {
      is_active,
      has_quizzes,
    };

    return this.cellService.getAllCells(filters);
  }

  @Post()
  @ApiOperation({ summary: 'crear una celula' })
  @ApiBody({ type: CreateCellDto })
  @ApiResponse({
    status: 201,
    description: 'celula creada',
    type: CellEntity,
  })
  async createCell(
    @Body() data: { name: string; is_active: boolean; module_id: string },
  ) {
    return this.cellService.createCell(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'obtener celula segun id' })
  @ApiResponse({
    status: 201,
    description: 'retornar celula por id',
    type: CellEntity,
  })
  async getCellById(@Param('id') id: string) {
    const cell = await this.cellService.getCellById(id);
    if (!cell) {
      throw new NotFoundException(`Cell with ID ${id} not found`);
    }
    return cell;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Celula eliminada' })
  @ApiResponse({ status: 404, description: 'Celula no encontrada.' })
  async deleteCell(@Param('id') id: string) {
    this.cellService.deleteCell(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'actualizar una celula' })
  @ApiBody({ type: UpdateCellDto })
  @ApiResponse({
    status: 201,
    description: 'celula actualizada',
    type: CellEntity,
  })
  async updateCell(
    @Param('id') id: string,
    @Body() data: { name: string; is_active: boolean; module_id: string },
  ) {
    return this.cellService.updateCell(id, data);
  }
}
