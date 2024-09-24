import { ChallengeType } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateQuizDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name:string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    description?:string;
    
    @IsUUID()
    @ApiProperty()
    skill_level_id: string;
    
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
