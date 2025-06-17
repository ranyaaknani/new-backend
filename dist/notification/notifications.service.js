"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const notification_user_entity_1 = require("./notification-user.entity");
const notifications_entity_1 = require("./notifications.entity");
let NotificationService = class NotificationService {
    notificationRepository;
    notificationUserRepository;
    userRepository;
    constructor(notificationRepository, notificationUserRepository, userRepository) {
        this.notificationRepository = notificationRepository;
        this.notificationUserRepository = notificationUserRepository;
        this.userRepository = userRepository;
    }
    async create(createNotificationDto) {
        const { userIds, ...notificationData } = createNotificationDto;
        const users = await this.userRepository.findBy({ id: (0, typeorm_2.In)(userIds) });
        if (users.length !== userIds.length) {
            throw new common_1.BadRequestException('One or more users not found');
        }
        const notification = this.notificationRepository.create(notificationData);
        const savedNotification = await this.notificationRepository.save(notification);
        const notificationUsers = userIds.map((userId) => this.notificationUserRepository.create({
            notificationId: savedNotification.id,
            userId,
            isRead: false,
        }));
        await this.notificationUserRepository.save(notificationUsers);
        return this.findOne(savedNotification.id);
    }
    async findAll() {
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
    async findOne(id) {
        const notification = await this.notificationRepository.findOne({
            where: { id },
            relations: ['notificationUsers'],
        });
        if (!notification) {
            throw new common_1.NotFoundException(`Notification with ID ${id} not found`);
        }
        return notification;
    }
    async findByUserId(userId) {
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
    async update(id, updateNotificationDto) {
        if (updateNotificationDto.userIds) {
            await this.notificationUserRepository.delete({ notificationId: id });
            const notificationUsers = updateNotificationDto.userIds.map((userId) => this.notificationUserRepository.create({
                notificationId: id,
                userId,
                isRead: false,
            }));
            await this.notificationUserRepository.save(notificationUsers);
        }
        const { ...updateData } = updateNotificationDto;
        await this.notificationRepository.update(id, updateData);
        return this.findOne(id);
    }
    async remove(id) {
        const notification = await this.findOne(id);
        await this.notificationRepository.remove(notification);
    }
    async markAsRead(notificationId, userId) {
        const notificationUser = await this.notificationUserRepository.findOne({
            where: { notificationId, userId },
        });
        if (!notificationUser) {
            throw new common_1.NotFoundException('Notification not found for this user');
        }
        if (!notificationUser.isRead) {
            notificationUser.isRead = true;
            notificationUser.readAt = new Date();
            await this.notificationUserRepository.save(notificationUser);
        }
    }
    async markAsUnread(notificationId, userId) {
        const notificationUser = await this.notificationUserRepository.findOne({
            where: { notificationId, userId },
        });
        if (!notificationUser) {
            throw new common_1.NotFoundException('Notification not found for this user');
        }
        notificationUser.isRead = false;
        await this.notificationUserRepository.save(notificationUser);
    }
    async getUnreadCount(userId) {
        return this.notificationUserRepository.count({
            where: { userId, isRead: false },
        });
    }
    async markAllAsRead(userId) {
        await this.notificationUserRepository.update({ userId, isRead: false }, { isRead: true, readAt: new Date() });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notifications_entity_1.Notification)),
    __param(1, (0, typeorm_1.InjectRepository)(notification_user_entity_1.NotificationUser)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationService);
//# sourceMappingURL=notifications.service.js.map