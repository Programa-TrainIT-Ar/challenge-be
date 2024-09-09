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
@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  async getAllModules() {
    return this.moduleService.getAllModules();
  }

  @Post()
  createModule(@Body() data: Module) {
    return this.moduleService.createModule(data);
  }

  @Get(':id')
  async getModuleById(@Param('id') id: string) {
    const module = await this.moduleService.getModuleById(Number(id));
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return module;
  }

  @Delete(':id')
  async deleteModule(@Param('id') id: string) {
    this.moduleService.deleteModule(Number(id));
  }

  @Put(':id')
  async updateModule(@Param('id') id: string, @Body() data: Module) {
    return this.moduleService.updateModule(Number(id));
  }
}
