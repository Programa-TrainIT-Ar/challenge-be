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
    return this.prisma.question.findMany();
  }

  //READ (FIND ONE BY ID)
  async findOne(id: string) {
    return this.prisma.question.findUnique({
      where: { id }
    });
  }

  //UPDATE
  async update(id: string, data: Prisma.QuestionUpdateInput) {
    return this.prisma.question.update({
      where: { id },
      data,
    });
  }

  //DELETE
  async delete(id: string) {
    return this.prisma.question.delete({
      where: { id }
    });
  }
}
