import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
  @ApiProperty({ description: 'Email del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class TokenEmail_PasswordDto {
  @ApiProperty({ description: 'Token de confirmación de email y restablecimiento de contraseña' })
  @IsString()
  @IsNotEmpty()
  confirmationToken: string;
}

export class TokenWithPasswordDto extends TokenEmail_PasswordDto {
  @ApiProperty({ description: 'Nueva contraseña del usuario' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Confirmar nueva contraseña del usuario' })
  @IsNotEmpty()
  confirmPassword: string;
}