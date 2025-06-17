"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notification_user_entity_1 = require("./notification-user.entity");
const user_entity_1 = require("../users/user.entity");
const notifications_entity_1 = require("./notifications.entity");
const notifications_controller_1 = require("./notifications.controller");
const notifications_service_1 = require("./notifications.service");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([notifications_entity_1.Notification, notification_user_entity_1.NotificationUser, user_entity_1.User])],
        controllers: [notifications_controller_1.NotificationController],
        providers: [notifications_service_1.NotificationService],
        exports: [notifications_service_1.NotificationService],
    })
], NotificationModule);
//# sourceMappingURL=notifications.module.js.map