import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  photo?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  gender?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  phone_number?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  timezone?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  birthdate?: Date; // Agregado para el nacimiento
}
