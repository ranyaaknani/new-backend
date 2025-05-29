import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

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

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

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
  @ValidateNested({ each: true })
  @Type(() => CreateResourceDto)
  @IsOptional()
  resources?: CreateResourceDto[];

  @IsArray()
  @IsOptional()
  questions?: any[];
}

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
}

export class CreateFormationDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  domaine: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  objectifs: string;

  @IsEnum(['public', 'private'])
  @IsNotEmpty()
  accessType: 'public' | 'private';

  @IsUUID()
  @IsNotEmpty()
  formateurId: string;

  @ValidateNested()
  @Type(() => CreateInvitationDto)
  @IsOptional()
  invitation?: CreateInvitationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateModuleDto)
  @IsOptional()
  modules?: CreateModuleDto[];
}
