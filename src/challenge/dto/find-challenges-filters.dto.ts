import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Seniority } from '@prisma/client'; // Asegúrate de importar tu tipo Seniority de Prisma

export class FindChallengesFiltersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  module?: string;

  @IsOptional()
  @IsString()
  cell?: string;

  @IsOptional()
  @IsEnum(Seniority)
  seniority?: Seniority;
}