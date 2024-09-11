import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuestionType, Quiz, User } from '@prisma/client';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  /* @Post()
  create(@Body() quizData: {
    name:string;
    description?:string;
    skill_level:number;
    user:number;
    challenge_type:QuestionType;
    max_time?:number;
  }) {
    return this.quizService.createQuiz(quizData);
  } */

  @Get()
  findAll() {
    return this.quizService.findAllQuiz();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOneQuiz({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Quiz) {
    return this.quizService.updateQuiz({
      where: { id: Number(id) },
      data:data,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.removeQuiz({ id: Number(id) });
  }
}
