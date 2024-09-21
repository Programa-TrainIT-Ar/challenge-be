import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { QuestionEntity } from './entities/question.entity';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.questionService.delete(id);
  }
}
