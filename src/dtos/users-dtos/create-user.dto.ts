// import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
// import { Roles } from '../../schemas/user.schema';

// export class CreateUserDto {
//   @IsString()
//   @IsNotEmpty()
//   readonly username: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly firstName: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly lastName: string;

//   @IsEmail()
//   @IsNotEmpty()
//   readonly email: string;

//   @IsEnum(Roles, {
//     message: 'Valid role required',
//   })
//   readonly role: Roles;
// }
