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
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: data.quiz_id },
      include: { questions: { orderBy: { created_at: 'asc' } } }, // Asegurar orden
    });

    if (!quiz) {
      throw new Error('Quiz not found');
    }

    console.log('📋 Quiz encontrado con', quiz.questions.length, 'preguntas');
    console.log('📝 Respuestas recibidas:', data.question_answers.length, 'respuestas');

    var calification = 0;
    
    quiz.questions.forEach((question, index) => {
      var userAnswer = data.question_answers[index];
      console.log(`\n🔍 Pregunta ${index + 1}:`);
      console.log('  ID:', question.id);
      console.log('  Pregunta:', question.question);
      console.log('  Respuesta usuario:', userAnswer);
      console.log('  Respuesta correcta:', question.correct_option);
      
      if (JSON.stringify(userAnswer) === JSON.stringify(question.correct_option)) {
        calification++;
        console.log('  ✅ CORRECTO! Calificación actual:', calification);
      } else {
        console.log('  ❌ INCORRECTO');
      }
    });

    console.log(`\n🏆 Calificación final: ${calification}/${quiz.questions.length}`);

    return await this.prisma.challenge.create({
      data:{
        calification: calification,
        time_taken: data.time_taken,
        question_answers: data.question_answers,
        state: 'evaluated',
        quiz_id: data.quiz_id,
        user_id: data.user_id,
      } 
    });
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

  findOne(id: string) {
    return this.prisma.challenge.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateChallengeDto) {
    return this.prisma.challenge.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.challenge.delete({ where: { id } });
  }
}
