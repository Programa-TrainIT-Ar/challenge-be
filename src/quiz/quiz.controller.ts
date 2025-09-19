import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto, CreateQuizNestedDto } from './dto/create-quiz.dto'; 
import { UpdateQuizDto, UpdateQuizNestedDto } from './dto/update-quiz.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { QuizEntity, QuizEntityForTaking, QuizEntityNested, QuizEntityQuestion } from './entities/quiz.entity';
import { Roles } from 'src/authorization/roles/roles.decorator';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { RolesGuard } from 'src/authorization/roles/roles.guard';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard) // Requiere autorización y verificación de roles
  //@Roles('admin') // Solo permite a los administradores
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
  

  @Post('nested')
  @ApiCreatedResponse({ type: QuizEntityQuestion })
  async createNested(@Body() createQuizDto: CreateQuizNestedDto) {
    return await this.quizService.createQuizNested(createQuizDto);
  }
  
  @Get(':id')
  @ApiOkResponse({ type: QuizEntityQuestion })
  async findOne(@Param('id') id: string) {
    return await this.quizService.findOneQuiz({id});
  }

  @Get('take/:id')
  @ApiOkResponse({ type: QuizEntityForTaking })
  async takeQuiz(@Param('id') id: string) {
    return await this.quizService.getQuizForTaking({ id });
  }

  @Put(':id')
  @ApiOkResponse({ type: QuizEntity })
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.updateQuiz({id}, updateQuizDto);
  }

  @Put('nested/:id')
  @ApiOkResponse({ type: QuizEntityQuestion })
  updateNested(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizNestedDto) {
    return this.quizService.updateQuizNested({id}, updateQuizDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Quiz eliminado ok' })
  @ApiResponse({ status: 404, description: 'Quiz no encontrado.' })
  remove(@Param('id') id: string) {
    return this.quizService.removeQuiz({id});
  }
}