import {IsString, IsEmail, IsPhoneNumber, IsOptional} from 'class-validator';
export class UpdateUserDto{
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: number;
}