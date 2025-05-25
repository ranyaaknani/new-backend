import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ResourceDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  content?: string;
}

export class ModuleDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  resources: ResourceDto[];

  @IsArray()
  @IsOptional()
  questions?: any[];
}

export class InvitationDto {
  @IsString()
  @IsNotEmpty()
  mode: string;

  @IsArray()
  @IsString({ each: true })
  emails: string[];

  @IsOptional()
  linkGenerated?: boolean;

  @IsOptional()
  csvFile?: any;
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
  @Type(() => InvitationDto)
  invitation: InvitationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleDto)
  modules: ModuleDto[];
}
