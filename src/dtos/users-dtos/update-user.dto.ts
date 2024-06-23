// import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
// import { Roles } from 'src/schemas/user.schema';

// export class UpdateUserDto {
//   @IsString()
//   @IsOptional()
//   readonly username: string;

//   @IsString()
//   @IsOptional()
//   readonly firstName: string;

//   @IsString()
//   @IsOptional()
//   readonly lastName: string;

//   @IsEmail()
//   @IsOptional()
//   readonly email: string;

//   @IsEnum(Roles, {
//     message: 'Valid role required',
//   })
//   readonly role: Roles;
// }
