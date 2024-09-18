import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

  
@Injectable()
export class QuestionService {
  constructor ( private prisma: PrismaService ){}

  //CREATE
  async create(data: Prisma.QuestionCreateInput) {
    return this.prisma.question.create({
      data,
    });
  }

  //READ (FIND ALL)
  async findAll() {
    return this.prisma.question.findMany({
      include: { question: true }
    });
  }

  //READ (FIND ONE BY ID)
  async findOne(id: number) {
    return this.prisma.question.findUnique({
      where: { id },
      include: { question: true },
    });
  }

  //UPDATE
  async update(id: number, data: Prisma.QuestionUpdateInput) {
    return this.prisma.question.update({
      where: { id },
      data,
    });
  }

  //DELETE
  async delete(id: number) {
    return this.prisma.question.delete({
      where: { id }
    });
  }
}
