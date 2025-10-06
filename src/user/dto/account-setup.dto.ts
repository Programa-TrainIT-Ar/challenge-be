import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

/**
 * DTO utilizado para la configuración inicial de la cuenta (account-setup),
 * donde se establecen datos faltantes como el apellido, teléfono y contraseña.
 */
export class AccountSetupDto {
  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, {
    message: 'El apellido solo debe contener letras y espacios.',
  })
  @ApiProperty({ description: 'Apellido(s) del usuario.' })
  last_name: string;

  @IsString()
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio.' })
  @Matches(/^\+\d+$/, {
    message:
      'El número de teléfono debe comenzar con el signo "+" seguido de dígitos.',
  })
  @MinLength(8, {
    message: 'El número de teléfono debe tener al menos 8 caracteres.',
  })
  @ApiProperty({ description: 'Número de teléfono del usuario (con prefijo +).' })
  phone_number: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {
      message:
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.',
  })
  @ApiProperty({
    description: 'Contraseña para la cuenta del usuario.',
    writeOnly: true,
  })
  password: string;
}