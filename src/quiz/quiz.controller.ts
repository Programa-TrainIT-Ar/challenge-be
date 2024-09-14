import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto'; 
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QuizEntity } from './entities/quiz.entity';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  //@ApiCreatedResponse({ type: QuizEntity })
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  @ApiOkResponse({ type: QuizEntity, isArray: true })
  findAll() {
    return this.quizService.findAllQuiz();
  }

  @Get(':id')
  @ApiOkResponse({ type: QuizEntity })
  findOne(@Param('id') id: string) {
    return this.quizService.findOneQuiz({id});
  }

  @Put(':id')
  @ApiOkResponse({ type: QuizEntity })
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.updateQuiz({id}, updateQuizDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: QuizEntity })
  remove(@Param('id') id: string) {
    return this.quizService.removeQuiz({id});
  }
}
