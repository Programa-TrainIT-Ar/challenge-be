import { ApiProperty } from '@nestjs/swagger';
import { Seniority, QuestionType } from '@prisma/client';
import { IsArray, IsBoolean, IsEnum, IsInt, IsOctal, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';


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
    @IsPositive({ each: true })
    @IsArray()
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
