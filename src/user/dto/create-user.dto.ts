import { IsEmail, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsDate()
  birthdate?: Date; // Agregado para el nacimiento
}
