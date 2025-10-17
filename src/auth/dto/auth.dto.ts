import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password is too short. less than 6 symbols' })
  @IsString({ message: 'password is required' })
  password: string;
}
