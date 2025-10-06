import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cell, Prisma } from '@prisma/client';

interface CellFilters {
  is_active?: boolean;
  has_quizzes?: boolean; // Nuevo filtro para incluir solo cells con quizzes
}

@Injectable()
export class CellService {
  constructor(private prisma: PrismaService) {}

  async getAllCells(filters: CellFilters = {}): Promise<Cell[]> {
    const whereClause: Prisma.CellWhereInput = {};

    // 1. Filtrar por is_active
    if (filters.is_active !== undefined) {
      whereClause.is_active = filters.is_active;
    }

    // 2. Filtrar por la presencia de quizzes
    if (filters.has_quizzes) {
      // Se usa el operador 'some' en el campo relacional 'quizzes'
      // para indicar que DEBE existir AL MENOS UN quiz asociado.
      whereClause.quizzes = {
        some: {},
      };
    }

    // El objeto whereClause se construye dinámicamente
    return this.prisma.cell.findMany({
      where: whereClause,
    });
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
