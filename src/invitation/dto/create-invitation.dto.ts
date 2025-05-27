import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateInvitationDto {
  @IsString()
  @IsNotEmpty()
  mode: string;

  @IsArray()
  @IsString({ each: true })
  emails: string[];

  @IsOptional()
  linkGenerated?: boolean;

  @IsOptional()
  invitationLink?: string;

  @IsOptional()
  csvImage?: string;

  @IsOptional()
  validFrom?: Date;

  @IsOptional()
  validTo?: Date;

  @IsUUID()
  @IsNotEmpty()
  formationId: string;
}
