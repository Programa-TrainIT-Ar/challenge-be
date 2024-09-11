import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum } from 'class-validator';
import { QuestionType } from '@prisma/client'

export class CreateQuizDto {
    
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsOptional()
    @IsString()
    description?:string;
    
    @IsNotEmpty()
    @IsString()
    skill_level:number;
    
    @IsEnum(QuestionType)
    @IsString()
    challenge_type:QuestionType;
    
    @IsOptional()
    @IsInt()
    max_time?:number;

    @IsInt()
    user:number;

}
