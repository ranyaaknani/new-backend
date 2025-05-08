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
const user_entity_1 = require("../../users/user.entity");
const module_entity_1 = require("../../modules/entities/module.entity");
const participant_entity_1 = require("../../participant/entities/participant.entity");
let Formation = class Formation {
    id;
    titre;
    description;
    archived;
    formateur;
    modules;
    participants;
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
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Formation.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Formation.prototype, "archived", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.formations),
    __metadata("design:type", user_entity_1.User)
], Formation.prototype, "formateur", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => module_entity_1.Module, (module) => module.formation, { cascade: true }),
    __metadata("design:type", Array)
], Formation.prototype, "modules", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => participant_entity_1.Participant, (participant) => participant.formationsSuivies),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Formation.prototype, "participants", void 0);
exports.Formation = Formation = __decorate([
    (0, typeorm_1.Entity)()
], Formation);
//# sourceMappingURL=formation.entity.js.map