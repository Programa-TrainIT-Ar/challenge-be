import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Representa la entidad de usuario en la base de datos.
 */
@Entity('user') // Define la entidad y la tabla asociada en la base de datos
export class User {
  @PrimaryGeneratedColumn('uuid') // Define una columna que es una clave primaria generada automáticamente de tipo UUID
  id: string;

  @Column() 
  password?: string; // Cambiar a no opcional; se debe hashear antes de almacenar

  @Column({ nullable: true }) // Define una columna para el género, que es opcional
  gender?: string;
  
  @Column({ unique: true }) // Define una columna para el email que debe ser único
  email: string;

  @Column() // Define una columna para el nombre
  first_name: string;

  @Column() // Define una columna para el apellido
  last_name: string;

  @Column({ nullable: true }) // Define una columna para la foto, que es opcional
  photo?: string;

  @Column({ nullable: true }) // Define una columna para el número de teléfono, que es opcional
  phone_number?: string;

  @Column({ nullable: true }) // Define una columna para la zona horaria, que es opcional
  timezone?: string;

  // Aquí podrías agregar un campo para la fecha de nacimiento si es necesario
  @Column({ nullable: true }) 
  birthdate?: Date;
}
