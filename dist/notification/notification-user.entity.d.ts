import { Notification } from './notifications.entity';
import { User } from 'users/user.entity';
export declare class NotificationUser {
    id: string;
    isRead: boolean;
    readAt: Date;
    createdAt: Date;
    updatedAt: Date;
    notificationId: string;
    userId: string;
    notification: Notification;
    user: User;
}
