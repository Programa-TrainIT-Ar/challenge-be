import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto'; 
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { QuizEntity } from './entities/quiz.entity';
import { Prisma } from '@prisma/client';
import { get } from 'http';


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
  @ApiQuery({ name: 'skillLevel', required: false, type: String })
  @ApiOkResponse({ type: QuizEntity, isArray: true })
  async findAll(
    @Query('search') search? : string,
    @Query('createdBy') createdBy?: string,
    @Query('skillLevel') skillLevel?: string,
  ) {
    
    let where: Prisma.QuizWhereInput = {};
    let filter: any = {}

    if (createdBy) {
      filter.created_by = createdBy;
    }
    if (skillLevel) {
      filter.skill_level = skillLevel;
    }
    if (search) {
      filter.search = search;
    }

    return this.quizService.findQuizzes(filter)
  }
 /*  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'createdBy', required: false, type: String })
  @ApiQuery({ name: 'skillLevel', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'orderBy', required: false, type: String, example: 'name' })
  @ApiQuery({ name: 'orderDirection', required: false, type: String, enum: ['asc', 'desc'] })
  @ApiOkResponse({ type: QuizEntity, isArray: true })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('createdBy') createdBy?: string,
    @Query('skillLevel') skillLevel?: string,
    @Query('search') search?: string,
    @Query('orderBy') orderBy = 'name',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc',
  ) {
    const skip = (page - 1) * limit;

    let where: Prisma.QuizWhereInput = {};
    if (createdBy) {
      where.created_by_id = createdBy;
    }
    if (skillLevel) {
      where.skill_level_id = skillLevel;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
      const orderByObject: Prisma.QuizOrderByWithRelationInput = {};
    orderByObject[orderBy] = orderDirection;
    
    console.log({ page, limit, createdBy, skillLevel, search, orderBy, orderDirection });

    const { quizzes, total } = await this.quizService.findQuizzes({
      skip,
      take: limit,
      where,
      orderBy: orderByObject,
    });

    return {
      data: quizzes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
} */
  
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
