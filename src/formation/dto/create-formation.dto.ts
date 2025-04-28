import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormationDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}