import {
  IsArray,
  IsBoolean,
  IsDateString,
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
  @IsOptional()
  emails?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fromEmails?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  toEmails?: string[];

  @IsString()
  @IsOptional()
  invitationLink?: string;

  @IsBoolean()
  @IsOptional()
  linkGenerated?: boolean;

  @IsOptional()
  csvFile?: any;

  @IsString()
  @IsOptional()
  csvImage?: string;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsDateString()
  @IsOptional()
  expiresAt?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsUUID()
  @IsNotEmpty()
  formationId: string;
}
