import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto'; 
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { QuizEntity } from './entities/quiz.entity';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiCreatedResponse({ type: QuizEntity })
  async create(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'createdBy', required: false, type: String })
  @ApiQuery({ name: 'seniority', required: false, type: String, enum: ['trainee', 'junior', 'middle', 'senior']})
  @ApiQuery({ name: 'cell', required: false, type: String })
  @ApiOkResponse({ type: QuizEntity, isArray: true })
  async findAll(
    @Query('search') search? : string,
    @Query('createdBy') createdBy?: string,
    @Query('seniority') seniority?: string,
    @Query('cell') cell?: string,
  ) {
    
    let filter: any = {}

    if (createdBy) {
      filter.created_by = createdBy;
    }
    if (search) {
      filter.search = search;
    }
    if (seniority) {
      filter.seniority = seniority;
    }
    if (cell) {
      filter.cell = cell;
    }

    return this.quizService.findQuizzes(filter)
  }
  
  @Get(':id')
  @ApiOkResponse({ type: QuizEntity })
  async findOne(@Param('id') id: string) {
    return await this.quizService.findOneQuiz({id});
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
