import { IsArray, IsBoolean, IsInt, IsOctal, IsOptional, IsString } from 'class-validator';


export class CreateQuestionDto {
    @IsInt()
    questionId: number;

    @IsString()
    seniority: string;

    @IsString()
    type: string;

    @IsArray()
    options: number[];

    @IsInt()
    correct_option: number;

    @IsString()
    explanation: string;

    @IsString()
    @IsOptional()
    link: string;

    @IsBoolean()
    is_active: boolean;

}
