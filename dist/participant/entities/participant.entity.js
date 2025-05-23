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
const ressource_entity_1 = require("../../certificat/entities/ressource.entity");
let Participant = class Participant {
    id;
    nom;
    email;
    formationsSuivies;
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
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Participant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => formation_entity_1.Formation, (formation) => formation.participants),
    __metadata("design:type", Array)
], Participant.prototype, "formationsSuivies", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ressource_entity_1.Certificat, (certificat) => certificat.participants),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Participant.prototype, "certificatsObtenus", void 0);
exports.Participant = Participant = __decorate([
    (0, typeorm_1.Entity)()
], Participant);
//# sourceMappingURL=participant.entity.js.map