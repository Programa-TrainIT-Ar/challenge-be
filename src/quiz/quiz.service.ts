import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Quiz, Prisma } from '@prisma/client';
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
    searchTerm?: string;
    createdBy?: string;
    skillLevel?: string;
  }): Promise<{quizzes:Quiz[], total:number}> {
    const { searchTerm, createdBy, skillLevel } = filters;

    let where: Prisma.QuizWhereInput = {};
    
    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }
    
    if (createdBy) {
      where.OR = [
        ...(where.OR || []),
        { created_by: { first_name: { contains: createdBy, mode: 'insensitive' } } },
        { created_by: { last_name: { contains: createdBy, mode: 'insensitive' } } },
        { created_by: { email: { contains: createdBy, mode: 'insensitive' } } },
      ];
    }
    
    if (skillLevel) {
      where.skill_level = {
        seniority: skillLevel as any,
      };
    }
    const quizzes : Quiz[] = [];
    const total: number = 0;
    if (filters) {
    const [quizzes, total] = await Promise.all([
      this.prisma.quiz.findMany({
        where,include: {
          created_by: true,
          skill_level: true,
        },
      }),
      this.prisma.quiz.count({ where })
    ])} else {
      const [quizzes, total] = await Promise.all([
        this.prisma.quiz.findMany(),
        this.prisma.quiz.count({ where })
      ])
    }
    
    return {quizzes, total};
  }
  /* async findQuizzes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.QuizWhereUniqueInput;
    where?: Prisma.QuizWhereInput;
    orderBy?: Prisma.QuizOrderByWithRelationInput;
  }): Promise<{quizzes:Quiz[], total:number}> {
    const {skip, take, cursor, where, orderBy} = params;
    console.log({ skip, take, cursor, where, orderBy });
    const [quizzes, total] = await Promise.all([
      this.prisma.quiz.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          skill_level: true,
          created_by: true,
        },
      }),
      this.prisma.quiz.count({ where }),
    ])
    return { quizzes, total };
  } */

  async findOneQuiz(
    quizWhereUniqueInput: Prisma.QuizWhereUniqueInput,
  ): Promise<Quiz | null> {
    return await this.prisma.quiz.findUnique({
      where: quizWhereUniqueInput,
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
