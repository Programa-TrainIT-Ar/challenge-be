import { Injectable } from '@nestjs/common';
import { Prisma, Question, QuestionType, Seniority } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

  
@Injectable()
export class QuestionService {
  constructor ( private prisma: PrismaService ){}

  //CREATE
  async create(data: CreateQuestionDto): Promise<Question | null> {
    return this.prisma.question.create({
      data,
    });
  }

  //READ (FIND ALL)
  async findQuestions(filter:{
    search? : string,
    type?: string,
    seniority?: string,
  }):Promise<{questions:Question[], total: number}> {
    const {search, type, seniority}=filter;
    //creo una variable where vacia para almacenar los terminos de busqueda y filtros
    let where: Prisma.QuestionWhereInput= {};
    //si cada termino contiene algo lo asigna a where
    if (search) {
      where.OR = [
        ...(where.OR || []),
        { question: { contains: search, mode: 'insensitive' } },
        { quiz_id: search },
    ];
    }
    if (type) {
      where.type = type as QuestionType
    }
    if (seniority) {
      where.seniority = seniority as Seniority
    }
    //genera la consulta a la base de datos
    const [questions, total] = await Promise.all([
      this.prisma.question.findMany({
        where,
      }),
      this.prisma.question.count({where})
    ])
    return {questions, total};
  }

  //READ (FIND ONE BY ID)
  async findOne(id: string) {
    return this.prisma.question.findUnique({
      where: { id }
    });
  }

  //UPDATE
  async update(id: string, data: UpdateQuestionDto) {
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
