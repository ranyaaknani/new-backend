import { IsUUID } from 'class-validator';

export class MarkAsReadDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  notificationId: string;
}
