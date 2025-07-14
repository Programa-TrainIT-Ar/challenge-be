import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";


/**
 * Representa la entidad de usuario en la base de datos.
 */
export class UserEntity {
  @ApiProperty()// Define una columna que es una clave primaria generada automáticamente de tipo UUID
  id: UUID;

  @ApiProperty({ nullable: true, writeOnly: true }) // Define una columna para la contraseña, que es opcional y no se debe exponer al cliente
  password?: string; // Cambiar a no opcional; se debe hashear antes de almacenar
  
  @ApiProperty() // Define una columna para el email que debe ser único
  email: string;
  
  @ApiProperty() // Define una columna para el nombre
  first_name: string;
  
  @ApiProperty() // Define una columna para el apellido
  last_name: string;

  @ApiProperty({ nullable: true }) // Define una columna para el género, que es opcional
  gender?: string;

  @ApiProperty({ required: false }) // Define una columna para la foto, que es opcional
  photo?: string;

  @ApiProperty({ required: false }) // Define una columna para el número de teléfono, que es opcional
  phone_number?: string;

  @ApiProperty({ required: false }) // Define una columna para la zona horaria, que es opcional
  timezone?: string;

  @ApiProperty({ required: false }) // Define una columna para la fecha de nacimiento, que es opcional
  is_active?: boolean;

  @ApiProperty({ required: false }) // Define una columna para el estado de verificación del email, que es opcional
  is_staff?: boolean;

  @ApiProperty({ required: false }) // Define una columna para el rol del usuario, que es opcional
  is_superuser?: boolean;

  @ApiProperty({ required: false }) // Define una columna para el token de verificación del email, que es opcional
  created_at?: Date;

  @ApiProperty({ required: false }) // Define una columna para la fecha de actualización, que es opcional
  updated_at?: Date;

  @ApiProperty({ required: false }) // Define una columna para la fecha de creación, que es opcional
  last_login?: Date;

  @ApiProperty({ required: false }) // Aquí podrías agregar un campo para la fecha de nacimiento si es necesario
  birthdate?: Date;

  @ApiProperty({ default: false }) // Define una columna para el estado de verificación del email, por defecto es falso
  emailVerified: boolean;

  @ApiProperty({ required: false }) // Define una columna para el token de verificación del email, que es opcional
  emailVerificationToken?: string;

  @ApiProperty({ required: false }) // Define una columna para el token de restablecimiento de contraseña, que es opcional
  resetPasswordToken?: string;

  @ApiProperty({ required: false }) // Define una columna para la fecha de expiración del token de restablecimiento de contraseña, que es opcional
  resetPasswordExpires?: Date;
}
