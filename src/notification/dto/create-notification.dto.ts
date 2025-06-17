import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  metadata?: any;

  @IsArray()
  @IsUUID('4', { each: true })
  userIds: string[];
}
