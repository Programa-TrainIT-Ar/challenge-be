import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";


/**
 * Representa la entidad de usuario en la base de datos.
 */
export class UserEntity {
  @ApiProperty()// Define una columna que es una clave primaria generada automáticamente de tipo UUID
  id: UUID;

  @ApiProperty({ nullable: true }) 
  password?: string; // Cambiar a no opcional; se debe hashear antes de almacenar

  @ApiProperty({ nullable: true }) // Define una columna para el género, que es opcional
  gender?: string;
  
  @ApiProperty() // Define una columna para el email que debe ser único
  email: string;

  @ApiProperty() // Define una columna para el nombre
  first_name: string;

  @ApiProperty() // Define una columna para el apellido
  last_name: string;

  @ApiProperty({ required: false }) // Define una columna para la foto, que es opcional
  photo?: string;

  @ApiProperty({ required: false }) // Define una columna para el número de teléfono, que es opcional
  phone_number?: string;

  @ApiProperty({ required: false }) // Define una columna para la zona horaria, que es opcional
  timezone?: string;

  // Aquí podrías agregar un campo para la fecha de nacimiento si es necesario
  @ApiProperty({ required: false }) 
  birthdate?: Date;
}
