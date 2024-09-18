import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { CellService } from './cell.service';
import { Cell } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CellDto, CreateCellDto, UpdateCellDto } from './dto/cell.dto';

@ApiTags('Cell')
@Controller('cells')
export class CellController {
  constructor(private readonly cellService: CellService) {}

  @Get()
  @ApiOperation({ summary: 'obtener todas las celulas' })
  @ApiResponse({
    status: 201,
    description: 'retornar todas las celulas',
    type: CellDto,
  })
  async getAllCells() {
    return this.cellService.getAllCells();
  }

  @Post()
  @ApiOperation({ summary: 'crear una celula' })
  @ApiBody({ type: CreateCellDto })
  @ApiResponse({ status: 201, description: 'celula creada ok', type: CellDto })
  async createCell(
    @Body() data: { name: string; is_active: boolean; module_id: string },
  ) {
    return this.cellService.createCell(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'obtener celula segun id' })
  @ApiResponse({
    status: 201,
    description: 'retornar  celula por id',
    type: CellDto,
  })
  async getCellById(@Param('id') id: string) {
    const cell = await this.cellService.getCellById(id);
    if (!cell) {
      throw new NotFoundException(`Cell with ID ${id} not found`);
    }
    return cell;
  }

  @Delete(':id')
  async deleteCell(@Param('id') id: string) {
    this.cellService.deleteCell(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'actualizar una celula' })
  @ApiBody({ type: UpdateCellDto })
  @ApiResponse({
    status: 201,
    description: 'celula actualizada ok',
    type: CellDto,
  })
  async updateCell(
    @Param('id') id: string,
    @Body() data: { name: string; is_active: boolean; module_id: string },
  ) {
    return this.cellService.updateCell(id, data);
  }
}
