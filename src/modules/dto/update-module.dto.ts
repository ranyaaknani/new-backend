import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateResourceDto } from 'ressource/dto/create-ressource.dto';

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
  @ValidateNested({ each: true })
  @Type(() => CreateResourceDto)
  @IsOptional()
  resources?: CreateResourceDto[];

  @IsArray()
  @IsOptional()
  questions?: any[];
}
