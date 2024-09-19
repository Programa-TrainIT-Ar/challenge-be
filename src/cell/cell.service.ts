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

  /* prueba de error  async createCell(data: {
    name: string;
    is_active: boolean;
    module_id: string;
  }): Promise<Cell> {
    // Simula un error de restricción única
    throw new Prisma.PrismaClientKnownRequestError(
      'Simulated unique constraint error',
      {
        code: 'P2002',
      },
    );
  } */
  async createCell(data: {
    name: string;
    is_active: boolean;
    module_id: string;
  }): Promise<Cell> {
    // Verifica si ya existe una celda con el mismo nombre
    const existingCell = await this.prisma.cell.findFirst({
      where: {
        name: data.name,
      },
    });

    if (existingCell) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: 'A cell with this name already exists',
        error: 'Conflict',
      });
    }

    // Crea un nuevo registro si no existe uno con el mismo nombre
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
