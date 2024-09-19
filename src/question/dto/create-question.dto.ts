import { ApiProperty } from '@nestjs/swagger';
import { Seniority, QuestionType } from '@prisma/client';
import { IsArray, IsBoolean, IsEnum, IsInt, IsOctal, IsOptional, IsString } from 'class-validator';


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

    @IsArray()
    @ApiProperty()
    correct_option: number[];

    @IsString()
    @IsOptional()
    @ApiProperty()
    explanation?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    link?: string;

    @IsBoolean()
    @ApiProperty({ default:true })
    is_active: boolean = true;

}
