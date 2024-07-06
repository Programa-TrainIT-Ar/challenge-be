import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

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
}
