import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
    @IsOptional()
    @IsUUID()
    @ApiProperty()
    id?: string;
}
