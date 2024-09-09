import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@prisma/client';
@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async getAllModules(): Promise<Module[]> {
    return this.prisma.module.findMany();
  }

  async getModuleById(id: number): Promise<Module> {
    return this.prisma.module.findUnique({
      where: { id },
    });
  }

  async createModule(data: Module): Promise<Module> {
    return this.prisma.module.create({ data });
  }

  async updateModule(id: number, data: Module): Promise<Module[]> {
    return this.prisma.module.update({
      where: { id },
      data,
    });
  }

  async deleteModule(id: number): Promise<Module[]> {
    return this.prisma.module.delete({
      where: { id },
    });
  }
}
