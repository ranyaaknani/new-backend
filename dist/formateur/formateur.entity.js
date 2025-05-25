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
exports.Formateur = void 0;
const formation_entity_1 = require("../formation/entities/formation.entity");
const typeorm_1 = require("typeorm");
let Formateur = class Formateur {
    id;
    nom;
    email;
    password;
    formations;
    createdAt;
    updatedAt;
};
exports.Formateur = Formateur;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Formateur.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Formateur.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Formateur.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Formateur.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => formation_entity_1.Formation, (formation) => formation.formateur),
    __metadata("design:type", Array)
], Formateur.prototype, "formations", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Formateur.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Formateur.prototype, "updatedAt", void 0);
exports.Formateur = Formateur = __decorate([
    (0, typeorm_1.Entity)('formateurs')
], Formateur);
//# sourceMappingURL=formateur.entity.js.map