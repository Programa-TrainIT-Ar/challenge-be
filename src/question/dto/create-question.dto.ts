import { ApiProperty } from '@nestjs/swagger';
import { Seniority, QuestionType } from '@prisma/client';
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator';


export class CreateQuestionDto {
    @IsString()
    @ApiProperty()
    question: string;

    @IsEnum(Seniority)
    @ApiProperty({ enum: Seniority })
    seniority: Seniority;

    @IsEnum(QuestionType)
    @ApiProperty({ enum: QuestionType })
    type: QuestionType;

    @IsArray()
    @ApiProperty()
    options: string[];

    @IsInt({ each: true })
    @IsArray()
    @ValidateIf(o => o.type === QuestionType.multiple_choice)
    @ArrayMinSize(2, { message: 'Para preguntas de opción múltiple, debes seleccionar al menos 2 respuestas correctas' })
    @ApiProperty({ type: [Number] })
    correct_option: number[];

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    explanation?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    link?: string;

    @IsBoolean()
    @ApiProperty({ default:true })
    is_active: boolean = true;

    @IsUUID()
    @ApiProperty()
    quiz_id: string;
}
