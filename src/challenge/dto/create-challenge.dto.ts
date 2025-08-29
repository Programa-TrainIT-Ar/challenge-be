import { IsNotEmpty, IsInt, IsString, IsUUID } from 'class-validator';

export class CreateChallengeDto {
  @IsInt()
  @IsNotEmpty()
  calification: number;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  quiz_id: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}
