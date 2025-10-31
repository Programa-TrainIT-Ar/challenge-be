import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags, ApiQuery, ApiOkResponse, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { QuestionEntity } from './entities/question.entity';
import { HybridAuthGuard } from 'src/authorization/hybrid-auth.guard';
import { Roles } from 'src/authorization/roles/roles.decorator';
import { RolesGuard } from 'src/authorization/roles/roles.guard';

@ApiTags('Question')
@UseGuards(HybridAuthGuard)
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @ApiBearerAuth()
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, type: String, enum: ['multiple_choice', 'simple_choice', 'true_false', 'open_ended', 'code' ]})
  @ApiQuery({ name: 'seniority', required: false, type: String, enum: ['trainee', 'junior', 'middle', 'senior']})
  @ApiOkResponse({ type: QuestionEntity, isArray: true })
  findAll(
    @Query('search') search? : string,
    @Query('type') type?: string,
    @Query('seniority') seniority?: string,
  ) {
    let filter: any = {};
    
    if (search) {
      filter.search = search;
    }
    if (type) {
      filter.type = type;
    }
    if (seniority) {
      filter.seniority = seniority;
    }
    
    return this.questionService.findQuestions(filter);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ type: QuestionEntity })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: QuestionEntity })
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ type: QuestionEntity })
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'Question eliminado ok' })
  @ApiResponse({ status: 404, description: 'Question no encontrado.' })
  delete(@Param('id') id: string) {
    return this.questionService.delete(id);
  }
}