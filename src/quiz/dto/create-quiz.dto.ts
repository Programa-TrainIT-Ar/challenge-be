import { ChallengeType, Seniority } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

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
    created_by_id: string

    @IsBoolean()
    @ApiProperty({ required: false, default:true })
    is_active: boolean=true
}