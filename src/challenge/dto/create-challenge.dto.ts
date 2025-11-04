import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsUUID, IsArray, IsString, IsOptional } from 'class-validator';

export class CreateChallengeDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'tiempo transcurrido para resolver en el challenge',
  })
  time_taken: number;

  @IsArray({ each: true })
  @IsNotEmpty()
  @ApiProperty({
    description: 'respuestas a las preguntas del challenge',
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  })
  question_answers: number[][];

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del quiz asociado al challenge' })
  quiz_id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del usuario que realiza el challenge' })
  user_id: string;
}
