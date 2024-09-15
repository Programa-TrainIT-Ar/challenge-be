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
} from '@nestjs/common';
import { CellService } from './cell.service';
import { Cell } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Cell")
@Controller('cells')
export class CellController {
  constructor(private readonly cellService: CellService) {}

  @Get()
  async getAllCells() {
    return this.cellService.getAllCells();
  }

  @Post()
  async createCell(
    @Body() data: { name: string; is_active: boolean; module_id: string },
  ) {
    try {
      return await this.cellService.createCell(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
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
  async updateCell(
    @Param('id') id: string,
    @Body() data: { name: string; is_active: boolean; module_id: string },
  ) {
    return this.cellService.updateCell(id, data);
  }
}
