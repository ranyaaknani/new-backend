import { NotificationService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationDto): Promise<import("./notifications.entity").Notification>;
    findAll(): Promise<import("./dto/notifications.dto").NotificationsDto[]>;
    findByUserId(userId: string): Promise<import("./dto/notifications.dto").NotificationsDto[]>;
    getUnreadCount(userId: string): Promise<number>;
    findOne(id: string): Promise<import("./notifications.entity").Notification>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<import("./notifications.entity").Notification>;
    markAsRead(notificationId: string, userId: string): Promise<void>;
    markAsUnread(notificationId: string, userId: string): Promise<void>;
    markAllAsRead(userId: string): Promise<void>;
    remove(id: string): Promise<void>;
}
