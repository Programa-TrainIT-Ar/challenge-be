
import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Quiz, Prisma, Seniority } from '@prisma/client';
import { CreateQuizDto, CreateQuizNestedDto } from './dto/create-quiz.dto';
import { UpdateQuizDto, UpdateQuizNestedDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async createQuiz(data: CreateQuizDto): Promise<Quiz | null> {
    //Crea un quiz
    return this.prisma.quiz.create({
      data,
    });
  }

  async createQuizNested(data: CreateQuizNestedDto): Promise<Quiz | null> {
    //crea un quiz con 10 preguntas anidadas
    const { questions, ...quizData } = data;
    
    return this.prisma.quiz.create({
      data: {
        ...quizData,
        questions: {
          create: questions.map(question => ({
            ...question
          }))
        }
      },
      include: {
        created_by: true,
        cell: true,
        questions: true
      }
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

  async updateQuiz(
    // Actualiza un quiz
    where: Prisma.QuizWhereUniqueInput,
    data: Prisma.QuizUpdateInput,
  ): Promise<Quiz> {
    return this.prisma.quiz.update({
      where,
      data,
    });
  }

  async updateQuizNested(where: { id: string }, updateQuizDto: UpdateQuizNestedDto){
      // Actualiza un quiz con sus preguntas anidadas
      // Primero verificamos que el quiz existe
      const existingQuiz = await this.prisma.quiz.findUnique({
          where,
          include: { questions: true }
      });

      if (!existingQuiz) {
          throw new NotFoundException(`Quiz with ID ${where.id} not found`);
      }
    const { questions, ...quizData } = updateQuizDto;
    
    return this.prisma.quiz.update({
        where,
        data: {
            ...quizData,
            questions: {
                update: questions.map(question => ({
                    where: { id: question.id || '' },
                    data: question,
                }))
              }
        },
        include: {
          questions: true
        }
    });
}

  async removeQuiz(where: Prisma.QuizWhereUniqueInput): Promise<Quiz> {
    return this.prisma.quiz.delete({
      where,
    });
  }
}

