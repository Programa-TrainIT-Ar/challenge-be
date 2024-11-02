import { ChallengeType, QuestionType, Seniority } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID, MinLength, ValidateIf, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

// Define CreateQuestionNestedDto para anidar las preguntas en Quiz
export class CreateQuestionNestedDto {
    
    @IsOptional()
    @IsUUID()
    @ApiProperty({ required: false })
    id?: string;

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
}

export class CreateQuizDto {
    
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    @MinLength(3, { message: 'El campo debe tener al menos 3 caracteres' })
    @ApiProperty({minLength: 3, description: 'El nombre debe tener al menos 3 caracteres'})
    name:string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    description?:string;
    
    @IsUUID()
    @ApiProperty()
    cell_id: string;
    
    @IsEnum(Seniority)
    @ApiProperty({ enum: Seniority })
    seniority: Seniority;

    @IsEnum(ChallengeType)
    @ApiProperty({ enum: ChallengeType })
    challenge_type:ChallengeType;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    @ApiProperty({ required: false })
    max_time?:number;

    @IsUUID()
    @ApiProperty()
    created_by_id: string;

    @IsBoolean()
    @ApiProperty({ required: false, default:true })
    is_active: boolean=true;

    //Este campo anida las 10 question
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(10)
    @ArrayMaxSize(10)
    @Type(() => CreateQuestionNestedDto)
    @ApiProperty({ 
        type: () => CreateQuestionNestedDto,
        isArray: true,
        description: 'Array de Questions asociadas al Quiz' 
    })
    questions: CreateQuestionNestedDto[];
}