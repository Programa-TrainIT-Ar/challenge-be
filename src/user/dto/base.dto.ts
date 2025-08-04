import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailDto {
  @ApiProperty({ description: 'Email del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  first_name:string;
}

export class TokenDto {
  @ApiProperty({ description: 'Token de restablecimiento de contraseña' })
  @IsNotEmpty()
  token: string;
}

export class TokenWithPasswordDto extends TokenDto {
  @ApiProperty({ description: 'Nueva contraseña del usuario' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Confirmar nueva contraseña del usuario' })
  @IsNotEmpty()
  confirmPassword: string;
}