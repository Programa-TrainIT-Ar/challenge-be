import { PartialType } from '@nestjs/swagger';
import { CreateQuizDto, CreateQuizNestedDto } from './create-quiz.dto';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {}
export class UpdateQuizNestedDto extends PartialType(CreateQuizNestedDto) {}