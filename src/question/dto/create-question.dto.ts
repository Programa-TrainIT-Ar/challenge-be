import { ApiProperty } from '@nestjs/swagger';
import { Seniority, QuestionType } from '@prisma/client';
import { IsArray, IsBoolean, IsEnum, IsInt, IsOctal, IsOptional, IsString } from 'class-validator';


export class CreateQuestionDto {
    @IsString()
    @ApiProperty()
    question: string;

    @IsEnum(Seniority)
    @ApiProperty()
    seniority: Seniority;

    @IsEnum(QuestionType)
    @ApiProperty()
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
    @ApiProperty({ required: false, default:true })
    is_active: boolean = true;

}
