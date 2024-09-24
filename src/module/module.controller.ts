import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { Module } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateModuleDto, ModuleDto, UpdateModuleDto } from './dto/module.dto';

@ApiTags('Module')
@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  @ApiOperation({ summary: 'retornar todos los modulos' })
  @ApiResponse({
    status: 201,
    description: 'modulos retornado ok',
    type: ModuleDto,
  })
  async getAllModules() {
    return this.moduleService.getAllModules();
  }

  @Post()
  @ApiOperation({ summary: 'crear un modulo' })
  @ApiBody({ type: CreateModuleDto })
  @ApiResponse({
    status: 201,
    description: 'modulo creada ok',
    type: ModuleDto,
  })
  createModule(@Body() data: Module) {
    return this.moduleService.createModule(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'retornar modulo segun id' })
  @ApiResponse({
    status: 201,
    description: 'modulo retornado ok',
    type: ModuleDto,
  })
  async getModuleById(@Param('id') id: string) {
    const module = await this.moduleService.getModuleById(id);
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return module;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'eliminar modulo segun id' })
  @ApiResponse({
    status: 204,
    description: 'modulo eliminado ok',
    type: ModuleDto,
  })
  async deleteModule(@Param('id') id: string) {
    this.moduleService.deleteModule(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'actualizar un modulo' })
  @ApiBody({ type: UpdateModuleDto })
  @ApiResponse({
    status: 201,
    description: 'modulo actualizado ok',
    type: ModuleDto,
  })
  async updateModule(@Param('id') id: string, @Body() data: Module) {
    return this.moduleService.updateModule(id, data);
  }
}
