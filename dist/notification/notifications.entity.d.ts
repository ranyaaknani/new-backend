import { NotificationUser } from './notification-user.entity';
export declare class Notification {
    id: string;
    title: string;
    body: string;
    type: string;
    metadata: any;
    createdAt: Date;
    updatedAt: Date;
    notificationUsers: NotificationUser[];
}
