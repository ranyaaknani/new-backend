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
exports.InvitationEntity = void 0;
const formation_entity_1 = require("../formation/entities/formation.entity");
const typeorm_1 = require("typeorm");
let InvitationEntity = class InvitationEntity {
    id;
    mode;
    emails;
    fromEmails;
    toEmails;
    invitationLink;
    linkGenerated;
    csvFile;
    csvImage;
    subject;
    message;
    expiresAt;
    isActive;
    formation;
    formationId;
    createdAt;
    updatedAt;
};
exports.InvitationEntity = InvitationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InvitationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InvitationEntity.prototype, "mode", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], InvitationEntity.prototype, "emails", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], InvitationEntity.prototype, "fromEmails", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], InvitationEntity.prototype, "toEmails", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InvitationEntity.prototype, "invitationLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], InvitationEntity.prototype, "linkGenerated", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InvitationEntity.prototype, "csvFile", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InvitationEntity.prototype, "csvImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InvitationEntity.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], InvitationEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], InvitationEntity.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], InvitationEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => formation_entity_1.Formation, (formation) => formation.invitations),
    (0, typeorm_1.JoinColumn)({ name: 'formationId' }),
    __metadata("design:type", formation_entity_1.Formation)
], InvitationEntity.prototype, "formation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], InvitationEntity.prototype, "formationId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InvitationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], InvitationEntity.prototype, "updatedAt", void 0);
exports.InvitationEntity = InvitationEntity = __decorate([
    (0, typeorm_1.Entity)('invitations')
], InvitationEntity);
//# sourceMappingURL=invitation.entity.js.map