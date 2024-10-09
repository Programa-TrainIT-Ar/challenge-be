import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@prisma/client';
@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async getAllModules(): Promise<Module[]> {
    return this.prisma.module.findMany({
      include: {
        cell: true
      }
    });
  }

  async getModuleById(id: string): Promise<Module> {
    return this.prisma.module.findUnique({
      where: { id },
      include: {
        cell: true
      },
    });
  }

  async createModule(data: Module): Promise<Module> {
    return this.prisma.module.create({ data });
  }

  async updateModule(
    id: string,
    data: { name?: string; is_active?: boolean },
  ): Promise<Module> {
    return this.prisma.module.update({
      where: { id },
      data,
    });
  }

  async deleteModule(id: string): Promise<Module> {
    return this.prisma.module.delete({
      where: { id },
    });
  }
}