import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCertificateDto {
  @IsNotEmpty()
  @IsString()
  nomParticipant: string;

  @IsNotEmpty()
  @IsString()
  formation: string;

  @IsNotEmpty()
  @IsUUID()
  participantId: string;

  @IsNotEmpty()
  @IsUUID()
  formationId: string;
}
