import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  niveau: string;

  @IsNotEmpty()
  @IsString()
  formationId: string;
}