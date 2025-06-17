import { Repository } from 'typeorm';
import { User } from 'users/user.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationUser } from './notification-user.entity';
import { NotificationsDto } from './dto/notifications.dto';
import { Notification } from './notifications.entity';
export declare class NotificationService {
    private notificationRepository;
    private notificationUserRepository;
    private userRepository;
    constructor(notificationRepository: Repository<Notification>, notificationUserRepository: Repository<NotificationUser>, userRepository: Repository<User>);
    create(createNotificationDto: CreateNotificationDto): Promise<Notification>;
    findAll(): Promise<NotificationsDto[]>;
    findOne(id: string): Promise<Notification>;
    findByUserId(userId: string): Promise<NotificationsDto[]>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification>;
    remove(id: string): Promise<void>;
    markAsRead(notificationId: string, userId: string): Promise<void>;
    markAsUnread(notificationId: string, userId: string): Promise<void>;
    getUnreadCount(userId: string): Promise<number>;
    markAllAsRead(userId: string): Promise<void>;
}
