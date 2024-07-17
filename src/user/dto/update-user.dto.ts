import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from './role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    @MinLength(5)
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    name: string

    @IsString()
    @MinLength(1)
    nickname: string

    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    picture: string

    @IsOptional()
    @IsString()
    role: Role
}
