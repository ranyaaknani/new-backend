"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const invitation_entity_1 = require("./invitation.entity");
const formation_entity_1 = require("../formation/entities/formation.entity");
const invitation_controller_1 = require("./invitation.controller");
const invitation_service_1 = require("./invitation.service");
let InvitationsModule = class InvitationsModule {
};
exports.InvitationsModule = InvitationsModule;
exports.InvitationsModule = InvitationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([invitation_entity_1.InvitationEntity, formation_entity_1.Formation])],
        controllers: [invitation_controller_1.InvitationsController],
        providers: [invitation_service_1.InvitationsService],
        exports: [invitation_service_1.InvitationsService],
    })
], InvitationsModule);
//# sourceMappingURL=invitation.module.js.map