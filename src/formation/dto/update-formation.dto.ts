import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateResourceDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  videoLink?: string;

  @IsString()
  @IsOptional()
  pdfLink?: string;

  @IsString()
  @IsOptional()
  textLink?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateModuleDto {
  @IsString()
  @IsOptional()
  titre?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsArray()
  @IsOptional()
  questions?: any[];
}

export class UpdateInvitationDto {
  @IsString()
  @IsOptional()
  mode?: string;

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
}

export class UpdateFormationDto {
  @IsString()
  @IsOptional()
  titre?: string;

  @IsString()
  @IsOptional()
  domaine?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  objectifs?: string;

  @IsEnum(['public', 'private'])
  @IsOptional()
  accessType?: 'public' | 'private';

  @IsUUID()
  @IsOptional()
  formateurId?: string;
}
