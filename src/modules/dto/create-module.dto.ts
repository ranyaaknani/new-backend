import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateResourceDto } from 'ressource/dto/create-ressource.dto';

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

  @IsUUID()
  @IsNotEmpty()
  formationId: string;
}
