import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cell, Prisma } from '@prisma/client';

@Injectable()
export class CellService {
  constructor(private prisma: PrismaService) {}

  async getAllCells(): Promise<Cell[]> {
    return this.prisma.cell.findMany();
  }

  async getCellById(id: string): Promise<Cell | null> {
    return this.prisma.cell.findUnique({
      where: { id },
    });
  }

  async createCell(data: {
    name: string;
    is_active: boolean;
    module_id: string;
  }): Promise<Cell> {

    return this.prisma.cell.create({
      data: {
        name: data.name,
        is_active: data.is_active,
        module_id: data.module_id,
      },
    });
  }

  async updateCell(
    id: string,
    data: { name: string; is_active: boolean; module_id: string },
  ): Promise<Cell> {
    return this.prisma.cell.update({
      where: { id },
      data: {
        name: data.name,
        is_active: data.is_active,
        module_id: data.module_id,
      },
    });
  }

  async deleteCell(id: string): Promise<Cell> {
    return this.prisma.cell.delete({
      where: { id },
    });
  }
}