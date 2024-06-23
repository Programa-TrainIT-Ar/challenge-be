// import {
//   IsArray,
//   IsDate,
//   IsEmail,
//   IsEnum,
//   IsNotEmpty,
//   IsPhoneNumber,
//   IsPositive,
//   IsString,
//   IsTimeZone,
// } from 'class-validator';
// import { Roles } from '../../schemas/user.schema';

// export class ParticipantDto {
//   @IsString()
//   @IsNotEmpty()
//   readonly username: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly firstName: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly lastName: string;

//   @IsDate()
//   @IsNotEmpty()
//   birthDate: Date;

//   @IsArray()
//   @IsNotEmpty()
//   skills: string[];

//   @IsArray()
//   @IsNotEmpty()
//   softSkills: string[];

//   @IsTimeZone()
//   country: string;

//   @IsPhoneNumber()
//   phoneNumber: string;

//   @IsString()
//   languages: string[];

//   @IsPositive()
//   socials: string[];

//   @IsEmail()
//   @IsNotEmpty()
//   readonly email: string;

//   @IsEnum(Roles)
//   readonly role: Roles.Participant;
// }
