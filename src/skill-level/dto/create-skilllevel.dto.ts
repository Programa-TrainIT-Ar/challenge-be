import { Seniority } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateSkillLevelDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    cell_id:string;

    @IsEnum(Seniority)
    @IsOptional()
    @ApiProperty({ enum: Seniority })
    seniority:Seniority;
}
