import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Challenge, Prisma, Seniority } from '@prisma/client';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  //Crear challenge
  async create(data: CreateChallengeDto) {
    return await this.prisma.challenge.create({ data });
  }

  async findChallenges(filters: {
    search?: string;
    cell?: string;
    seniority?: string;
    module?: string;
  }): Promise<{ challenges: Challenge[]; total: number }> {
    const { search, cell, seniority, module } = filters;

    // Se crea un objeto 'where' para los filtros de la consulta
    let where: Prisma.ChallengeWhereInput = {};

    // Si existe un término de búsqueda, se aplica a varios campos
    if (search) {
      where.OR = [
        { user: { first_name: { contains: search, mode: 'insensitive' } } },
        { user: { last_name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
      ];
    }

    // Filtro por seniority
    if (seniority) {
      where.quiz = {
        seniority: seniority as Seniority,
      };
    }

    // Filtro por módulo (a través de la relación quiz -> cell -> module)
    if (module) {
      where.quiz = {
        cell: {
          module: {
            name: { equals: module, mode: 'insensitive' },
          },
        },
      };
    }

    // Filtro por célula (a través de la relación quiz -> cell)
    if (cell) {
      where.quiz = {
        cell: {
          name: { equals: cell, mode: 'insensitive' },
        },
      };
    }

    // Se ejecutan las dos consultas en paralelo para mejorar el rendimiento
    const [challenges, total] = await Promise.all([
      this.prisma.challenge.findMany({
        where,
        include: {
          user: true,
          quiz: {
            include: {
              cell: {
                include: {
                  module: true,
                },
              },
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
      this.prisma.challenge.count({ where }),
    ]);

    return { challenges, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
