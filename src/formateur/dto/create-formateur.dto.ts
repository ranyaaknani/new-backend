import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateFormateurDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
