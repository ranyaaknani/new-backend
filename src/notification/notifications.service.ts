import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'users/user.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationUser } from './notification-user.entity';
import { NotificationsDto } from './dto/notifications.dto';
import { Notification } from './notifications.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationUser)
    private notificationUserRepository: Repository<NotificationUser>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const { userIds, ...notificationData } = createNotificationDto;

    // Verify all users exist
    const users = await this.userRepository.findBy({ id: In(userIds) });
    if (users.length !== userIds.length) {
      throw new BadRequestException('One or more users not found');
    }

    // Create notification
    const notification = this.notificationRepository.create(notificationData);
    const savedNotification =
      await this.notificationRepository.save(notification);

    // Create notification-user relationships
    const notificationUsers = userIds.map((userId) =>
      this.notificationUserRepository.create({
        notificationId: savedNotification.id,
        userId,
        isRead: false,
      }),
    );

    await this.notificationUserRepository.save(notificationUsers);

    return this.findOne(savedNotification.id);
  }

  async findAll(): Promise<NotificationsDto[]> {
    const notifications = await this.notificationRepository.find({
      relations: ['notificationUsers'],
      order: { createdAt: 'DESC' },
    });

    return notifications.map((notification) => ({
      id: notification.id,
      title: notification.title,
      body: notification.body,
      type: notification.type,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
      userIds: notification.notificationUsers.map((nu) => nu.userId),
    }));
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
      relations: ['notificationUsers'],
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }

  async findByUserId(userId: string): Promise<NotificationsDto[]> {
    const notificationUsers = await this.notificationUserRepository.find({
      where: { userId },
      relations: ['notification'],
      order: { createdAt: 'DESC' },
    });

    return notificationUsers.map((nu) => ({
      id: nu.notification.id,
      title: nu.notification.title,
      body: nu.notification.body,
      type: nu.notification.type,
      createdAt: nu.notification.createdAt,
      updatedAt: nu.notification.updatedAt,
      userIds: [userId],
      isRead: nu.isRead,
    }));
  }

  async update(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    if (updateNotificationDto.userIds) {
      // Remove existing relationships
      await this.notificationUserRepository.delete({ notificationId: id });

      // Create new relationships
      const notificationUsers = updateNotificationDto.userIds.map((userId) =>
        this.notificationUserRepository.create({
          notificationId: id,
          userId,
          isRead: false,
        }),
      );
      await this.notificationUserRepository.save(notificationUsers);
    }

    const { ...updateData } = updateNotificationDto;
    await this.notificationRepository.update(id, updateData);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const notification = await this.findOne(id);
    await this.notificationRepository.remove(notification);
  }

  async markAsRead(notificationId: string, userId: string): Promise<void> {
    const notificationUser = await this.notificationUserRepository.findOne({
      where: { notificationId, userId },
    });

    if (!notificationUser) {
      throw new NotFoundException('Notification not found for this user');
    }

    if (!notificationUser.isRead) {
      notificationUser.isRead = true;
      notificationUser.readAt = new Date();
      await this.notificationUserRepository.save(notificationUser);
    }
  }

  async markAsUnread(notificationId: string, userId: string): Promise<void> {
    const notificationUser = await this.notificationUserRepository.findOne({
      where: { notificationId, userId },
    });

    if (!notificationUser) {
      throw new NotFoundException('Notification not found for this user');
    }

    notificationUser.isRead = false;
    await this.notificationUserRepository.save(notificationUser);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationUserRepository.count({
      where: { userId, isRead: false },
    });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationUserRepository.update(
      { userId, isRead: false },
      { isRead: true, readAt: new Date() },
    );
  }
}
