
import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Quiz, Prisma, Seniority } from '@prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async createQuiz(data: CreateQuizDto): Promise<Quiz | null> {
    return this.prisma.quiz.create({
      data,
    });
  }

  async findQuizzes(filters: {
    search?: string;
    module?: string;
    cell?: string;
    seniority?: string;
  }): Promise<{quizzes:Quiz[], total:number}> {
    const { search, cell, seniority, module } = filters;
    //creo una variable where vacia para almacenar los terminos de busqueda y filtros
    let where: Prisma.QuizWhereInput = {};
    //si cada termino contiene algo lo asigna a where
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { created_by: { first_name: { contains: search, mode: 'insensitive' } } },
        { created_by: { last_name: { contains: search, mode: 'insensitive' } } },
        { created_by: { email: { contains: search, mode: 'insensitive' } } },
      ];
    }
    
    if (module) {
      where.cell = {
        module: {
          name: { contains: module, mode: 'insensitive' }
        }
      };
    }

    if (cell) {
      where.cell = {
        name: { contains: cell, mode: 'insensitive' }
      };
    }
    
    if (seniority) {
      where.seniority = seniority as Seniority;
    }
        
    //genera la consulta a la base de datos
    const [quizzes, total] = await Promise.all([
      this.prisma.quiz.findMany({
        where,
        include: {
          created_by: true,
          cell: {
            include: {
              module: true
            }
        },
      }
      }),
      this.prisma.quiz.count({ where })
    ])

    return {quizzes, total};
     
  }

  async findOneQuiz(
    quizWhereUniqueInput: Prisma.QuizWhereUniqueInput,
  ): Promise<Quiz | null> {
    return await this.prisma.quiz.findUnique({
      where: quizWhereUniqueInput,
      include: {
        created_by: true,
        cell: {
          include: {
            module: true
          }
        },
        questions: true,
    }
  });
  }

  updateQuiz(
    where: Prisma.QuizWhereUniqueInput,
    data: Prisma.QuizUpdateInput,
  ): Promise<Quiz> {
    return this.prisma.quiz.update({
      where,
      data,
    });
  }

  async removeQuiz(where: Prisma.QuizWhereUniqueInput): Promise<Quiz> {
    return this.prisma.quiz.delete({
      where,
    });
  }
}

