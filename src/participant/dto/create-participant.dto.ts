import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsIn,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';

export class CreateParticipantDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Débutant', 'Intermédiaire', 'Avancé'])
  niveau: string;

  @IsNotEmpty()
  @IsString()
  formationId: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  score?: number = 0;

  @IsOptional()
  @IsBoolean()
  certificatObtenu?: boolean = false;

  @IsOptional()
  @IsString()
  @IsIn(['Inscrit', 'En cours', 'Terminé', 'Annulé'])
  statusFormation?: string = 'Inscrit';
}
