import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cell } from '@prisma/client';
@Injectable()
export class CellService {
  constructor(private prisma: PrismaService) {}

  async getAllCells(): Promise<Cell[]> {
    return this.prisma.cell.findMany();
  }

  async getCellById(id: number): Promise<Cell> {
    return this.prisma.cell.findUnique({
      where: { id },
    });
  }

  async createCell(data: {
    name: string;
    is_active: boolean;
    module_id: number;
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
    id: number,
    data: { name: string; is_active: boolean; module_id: number },
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

  async deleteCell(id: number): Promise<Cell> {
    return this.prisma.cell.delete({
      where: { id },
    });
  }
}
