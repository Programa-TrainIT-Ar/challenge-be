import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Role } from './role.enum'
export class CreateUserDto {
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

