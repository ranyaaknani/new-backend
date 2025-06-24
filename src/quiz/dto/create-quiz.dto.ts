import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateQuizQuestionDto {
  @IsString()
  question: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(6)
  options: string[];

  @IsNumber()
  @Min(0)
  @Max(5)
  correctAnswer: number;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsNumber()
  @IsOptional()
  score?: number;
}

export class UpdateQuizQuestionDto {
  @IsString()
  @IsOptional()
  question?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(6)
  @IsOptional()
  options?: string[];

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  correctAnswer?: number;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsNumber()
  @IsOptional()
  score?: number;
}

export class CreateQuizDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  moduleId: string;

  @IsUUID()
  formationId: string;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuizQuestionDto)
  @IsOptional()
  questions?: CreateQuizQuestionDto[];
}

export class UpdateQuizDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuizQuestionDto)
  @IsOptional()
  questions?: UpdateQuizQuestionDto[];
}

export class QuizQueryDto {
  @IsUUID()
  @IsOptional()
  moduleId?: string;

  @IsUUID()
  @IsOptional()
  formationId?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
