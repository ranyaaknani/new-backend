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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationUser = void 0;
const typeorm_1 = require("typeorm");
const notifications_entity_1 = require("./notifications.entity");
const user_entity_1 = require("../users/user.entity");
let NotificationUser = class NotificationUser {
    id;
    isRead;
    readAt;
    createdAt;
    updatedAt;
    notificationId;
    userId;
    notification;
    user;
};
exports.NotificationUser = NotificationUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NotificationUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], NotificationUser.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], NotificationUser.prototype, "readAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NotificationUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], NotificationUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], NotificationUser.prototype, "notificationId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], NotificationUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notifications_entity_1.Notification, (notification) => notification.notificationUsers, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'notificationId' }),
    __metadata("design:type", notifications_entity_1.Notification)
], NotificationUser.prototype, "notification", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], NotificationUser.prototype, "user", void 0);
exports.NotificationUser = NotificationUser = __decorate([
    (0, typeorm_1.Entity)('notification_users')
], NotificationUser);
//# sourceMappingURL=notification-user.entity.js.map