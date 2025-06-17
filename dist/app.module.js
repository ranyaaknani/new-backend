"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const admin_module_1 = require("./admin/admin.module");
const users_module_1 = require("./users/users.module");
const formateur_module_1 = require("./formateur/formateur.module");
const auth_module_1 = require("./auth/auth.module");
const database_config_1 = require("./config/database.config");
const formations_module_1 = require("./formation/formations.module");
const modules_module_1 = require("./modules/modules.module");
const ressource_module_1 = require("./ressource/ressource.module");
const invitation_module_1 = require("./invitation/invitation.module");
const quiz_module_1 = require("./quiz/quiz.module");
const participant_module_1 = require("./participant/participant.module");
const certificat_module_1 = require("./certificat/certificat.module");
const notifications_module_1 = require("./notification/notifications.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.databaseConfig],
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => config.get('database'),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            formateur_module_1.FormateurModule,
            formations_module_1.FormationsModule,
            modules_module_1.ModulesModule,
            ressource_module_1.ResourcesModule,
            invitation_module_1.InvitationsModule,
            quiz_module_1.QuizModule,
            participant_module_1.ParticipantModule,
            certificat_module_1.CertificatModule,
            notifications_module_1.NotificationModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map