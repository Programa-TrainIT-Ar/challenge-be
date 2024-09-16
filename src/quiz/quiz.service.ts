import { Injectable } from '@nestjs/common';
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

  findAllQuiz() {
    return this.prisma.quiz.findMany();
  }

  async findOneQuiz(
    quizWhereUniqueInput: Prisma.QuizWhereUniqueInput,
  ): Promise<Quiz | null> {
    return this.prisma.quiz.findUnique({
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
