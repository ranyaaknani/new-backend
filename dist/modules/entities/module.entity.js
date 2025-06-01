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
exports.ModuleEntity = void 0;
const typeorm_1 = require("typeorm");
const formation_entity_1 = require("../../formation/entities/formation.entity");
const ressource_entity_1 = require("../../ressource/entities/ressource.entity");
const quiz_entity_1 = require("../../quiz/entities/quiz.entity");
let ModuleEntity = class ModuleEntity {
    id;
    titre;
    order;
    description;
    duration;
    questions;
    formationId;
    formation;
    resources;
    quizzes;
    createdAt;
    updatedAt;
};
exports.ModuleEntity = ModuleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ModuleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ModuleEntity.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ModuleEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ModuleEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ModuleEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true, default: '[]' }),
    __metadata("design:type", Array)
], ModuleEntity.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ModuleEntity.prototype, "formationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => formation_entity_1.Formation, (formation) => formation.modules, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'formationId' }),
    __metadata("design:type", formation_entity_1.Formation)
], ModuleEntity.prototype, "formation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ressource_entity_1.ResourceEntity, (resource) => resource.module, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], ModuleEntity.prototype, "resources", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_entity_1.Quiz, (quiz) => quiz.module, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], ModuleEntity.prototype, "quizzes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ModuleEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ModuleEntity.prototype, "updatedAt", void 0);
exports.ModuleEntity = ModuleEntity = __decorate([
    (0, typeorm_1.Entity)('modules')
], ModuleEntity);
//# sourceMappingURL=module.entity.js.map