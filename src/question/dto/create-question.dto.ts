import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateQuestionNestedDto } from 'src/quiz/dto/create-quiz.dto';


export class CreateQuestionDto extends CreateQuestionNestedDto{
    
    @IsUUID()
    @ApiProperty()
    quiz_id: string;
}
