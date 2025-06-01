import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCertificateDto {
  @IsOptional()
  @IsString()
  nomParticipant?: string;

  @IsOptional()
  @IsString()
  formation?: string;

  @IsOptional()
  @IsUUID()
  participantId?: string;

  @IsOptional()
  @IsUUID()
  formationId?: string;
}
