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
exports.Formation = void 0;
const typeorm_1 = require("typeorm");
const module_entity_1 = require("./module.entity");
const formateur_entity_1 = require("../../formateur/formateur.entity");
const participant_entity_1 = require("../../participant/entities/participant.entity");
const invitation_entity_1 = require("../../invitation/invitation.entity");
let Formation = class Formation {
    id;
    titre;
    domaine;
    image;
    description;
    objectifs;
    accessType;
    formateur;
    formateurId;
    modules;
    invitations;
    participants;
    createdAt;
    updatedAt;
};
exports.Formation = Formation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Formation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Formation.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Formation.prototype, "domaine", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Formation.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Formation.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Formation.prototype, "objectifs", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'private' }),
    __metadata("design:type", String)
], Formation.prototype, "accessType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => formateur_entity_1.Formateur, (formateur) => formateur.formations),
    (0, typeorm_1.JoinColumn)({ name: 'formateurId' }),
    __metadata("design:type", formateur_entity_1.Formateur)
], Formation.prototype, "formateur", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Formation.prototype, "formateurId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => module_entity_1.ModuleEntity, (module) => module.formation, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Formation.prototype, "modules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invitation_entity_1.InvitationEntity, (invitation) => invitation.formation, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Formation.prototype, "invitations", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => participant_entity_1.Participant),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Formation.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Formation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Formation.prototype, "updatedAt", void 0);
exports.Formation = Formation = __decorate([
    (0, typeorm_1.Entity)('formations')
], Formation);
//# sourceMappingURL=formation.entity.js.map