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
exports.Certificat = void 0;
const typeorm_1 = require("typeorm");
const participant_entity_1 = require("../../participant/entities/participant.entity");
let Certificat = class Certificat {
    id;
    nomParticipant;
    formation;
    dateObtention;
    urlPdf;
    participants;
};
exports.Certificat = Certificat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Certificat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Certificat.prototype, "nomParticipant", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Certificat.prototype, "formation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Certificat.prototype, "dateObtention", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Certificat.prototype, "urlPdf", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => participant_entity_1.Participant, participant => participant.certificatsObtenus),
    __metadata("design:type", Array)
], Certificat.prototype, "participants", void 0);
exports.Certificat = Certificat = __decorate([
    (0, typeorm_1.Entity)()
], Certificat);
//# sourceMappingURL=ressource.entity.js.map