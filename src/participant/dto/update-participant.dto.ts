import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateParticipantDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Débutant', 'Intermédiaire', 'Avancé'])
  niveau?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  score?: number;

  @IsOptional()
  @IsBoolean()
  certificatObtenu?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(['Inscrit', 'En cours', 'Terminé', 'Annulé'])
  statusFormation?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
