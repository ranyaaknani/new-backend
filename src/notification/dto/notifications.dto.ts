export class NotificationsDto {
  id: string;
  title: string;
  body: string;
  type?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  userIds: string[];
  isRead?: boolean;
}
