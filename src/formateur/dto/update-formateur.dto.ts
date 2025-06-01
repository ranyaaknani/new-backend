import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateFormateurDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
