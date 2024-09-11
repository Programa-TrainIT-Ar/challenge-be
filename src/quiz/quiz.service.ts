import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Quiz, Prisma } from '@prisma/client';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async createQuiz(data: Prisma.QuizCreateInput): Promise<Quiz>{
    return this.prisma.quiz.create({
      data,
    });
  }

  findAllQuiz() {
    return `This action returns all quiz`;
  }

  async findOneQuiz(
    quizWhereUniqueInput: Prisma.QuizWhereUniqueInput,
    ): Promise<Quiz | null> {
    return this.prisma.quiz.findUnique({
      where: quizWhereUniqueInput,
    });
  }

  updateQuiz(params: {
    where: Prisma.QuizWhereUniqueInput,
    data: Prisma.QuizUpdateInput,
  }): Promise<Quiz> {
    const {where, data} = params;
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
