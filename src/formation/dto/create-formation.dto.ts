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
import { CreateInvitationDto } from 'invitation/dto/create-invitation.dto';
import { CreateModuleDto } from 'modules/dto/create-module.dto';

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
  userId: string;

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
