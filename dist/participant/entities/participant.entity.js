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
exports.Participant = void 0;
const typeorm_1 = require("typeorm");
const formation_entity_1 = require("../../formation/entities/formation.entity");
const certificate_entity_1 = require("../../certificat/entities/certificate.entity");
let Participant = class Participant {
    id;
    nom;
    email;
    niveau;
    score;
    certificatObtenu;
    statusFormation;
    isActive;
    dateInscription;
    dateModification;
    formation;
    formationId;
    certificatsObtenus;
};
exports.Participant = Participant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Participant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Participant.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Participant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Débutant', 'Intermédiaire', 'Avancé'],
        default: 'Débutant',
    }),
    __metadata("design:type", String)
], Participant.prototype, "niveau", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Participant.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Participant.prototype, "certificatObtenu", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Inscrit', 'En cours', 'Terminé', 'Annulé'],
        default: 'Inscrit',
    }),
    __metadata("design:type", String)
], Participant.prototype, "statusFormation", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Participant.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Participant.prototype, "dateInscription", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Participant.prototype, "dateModification", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => formation_entity_1.Formation, (formation) => formation.participants, {
        eager: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'formationId' }),
    __metadata("design:type", formation_entity_1.Formation)
], Participant.prototype, "formation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Participant.prototype, "formationId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => certificate_entity_1.Certificat, (certificat) => certificat.participants),
    (0, typeorm_1.JoinTable)({
        name: 'participant_certificats',
        joinColumn: { name: 'participantId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'certificatId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Participant.prototype, "certificatsObtenus", void 0);
exports.Participant = Participant = __decorate([
    (0, typeorm_1.Entity)('participants')
], Participant);
//# sourceMappingURL=participant.entity.js.map