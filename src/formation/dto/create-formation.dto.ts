import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class QCMOptionDto {
  @IsString()
  texte: string;

  @IsString()
  justification: string;

  @IsBoolean()
  isCorrect: boolean;
}

class QuestionDto {
  @IsString()
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QCMOptionDto)
  options: QCMOptionDto[];
}

class ResourceDto {
  @IsEnum(['video', 'pdf', 'word', 'paragraph', 'table'])
  type: 'video' | 'pdf' | 'word' | 'paragraph' | 'table';

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  columns?: string[];

  @IsOptional()
  @IsArray()
  rows?: string[][];
}

class ModuleDto {
  @IsString()
  titre: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  resources: ResourceDto[];
}

class InvitationDto {
  @IsEnum(['email', 'link', 'csv'])
  mode: 'email' | 'link' | 'csv';

  @IsArray()
  emails: string[];

  @IsBoolean()
  linkGenerated: boolean;

  @IsOptional()
  csvFile: any; // File type handling
}

export class CreateFormationDto {
  @IsString()
  titre: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  domaine: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  objectifs?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleDto)
  modules: ModuleDto[];

  @IsEnum(['private', 'public'])
  accessType: 'private' | 'public';

  @ValidateNested()
  @Type(() => InvitationDto)
  invitation: InvitationDto;
}
