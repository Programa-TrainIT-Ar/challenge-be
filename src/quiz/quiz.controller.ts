import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto'; 
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { QuizEntity, QuizEntityNested, QuizEntityQuestion } from './entities/quiz.entity';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'seniority', required: false, type: String, enum: ['trainee', 'junior', 'middle', 'senior']})
  @ApiQuery({ name: 'cell', required: false, type: String })
  @ApiQuery({ name: 'module', required: false, type: String })
  @ApiOkResponse({ type: QuizEntityNested, isArray: true })
  async findAll(
    @Query('search') search? : string,
    @Query('seniority') seniority?: string,
    @Query('module') module?: string,
    @Query('cell') cell?: string,
  ) {
    
    let filter: any = {};

    if (search) {
      filter.search = search;
    }
    if (seniority) {
      filter.seniority = seniority;
    }
    if (cell) {
      filter.cell = cell;
    }

    if (module) {
      filter.module = module;
    }

    return this.quizService.findQuizzes(filter)
  }

  @Post()
  @ApiCreatedResponse({ type: QuizEntity })
  async create(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.createQuiz(createQuizDto);
  }
  
  @Get(':id')
  @ApiOkResponse({ type: QuizEntityQuestion })
  async findOne(@Param('id') id: string) {
    return await this.quizService.findOneQuiz({id});
  }

  @Put(':id')
  @ApiOkResponse({ type: QuizEntity })
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.updateQuiz({id}, updateQuizDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Quiz eliminado ok' })
  @ApiResponse({ status: 404, description: 'Quiz no encontrado.' })
  remove(@Param('id') id: string) {
    return this.quizService.removeQuiz({id});
  }
}