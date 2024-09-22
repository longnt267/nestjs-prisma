import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @MaxLength(75)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(32)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(/^\+?\d{1,4}?[-.\s]?(\(?\d{1,4}?\))?[-.\s]?\d{1,9}([-.\s]?\d{1,9}){1,4}$/)
  @IsString()
  @IsNotEmpty()
  phone: string;
}
