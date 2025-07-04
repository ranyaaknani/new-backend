import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateInvitationDto } from 'invitation/dto/create-invitation.dto';
import { CreateModuleDto } from 'modules/dto/create-module.dto';

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

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsEnum(['public', 'private'])
  @IsOptional()
  accessType?: 'public' | 'private';

  @IsUUID()
  @IsOptional()
  userId?: string;

  @ValidateNested()
  @Type(() => CreateInvitationDto)
  @IsOptional()
  invitation?: CreateInvitationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateModuleDto)
  @IsOptional()
  modules?: CreateModuleDto[];

  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  participantIds?: string[];
}
