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
exports.EvaluationTest = void 0;
const formation_entity_1 = require("../formation/entities/formation.entity");
const questions_entity_1 = require("../question/questions.entity");
const typeorm_1 = require("typeorm");
let EvaluationTest = class EvaluationTest {
    id;
    isEnabled;
    title;
    timeLimit;
    passingScore;
    description;
    createdAt;
    updatedAt;
    questions;
    formationId;
    formation;
};
exports.EvaluationTest = EvaluationTest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EvaluationTest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], EvaluationTest.prototype, "isEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], EvaluationTest.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], EvaluationTest.prototype, "timeLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], EvaluationTest.prototype, "passingScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EvaluationTest.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EvaluationTest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EvaluationTest.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => questions_entity_1.Question, (question) => question.evaluationTest, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], EvaluationTest.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], EvaluationTest.prototype, "formationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => formation_entity_1.Formation, (formation) => formation.questions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'formationId' }),
    __metadata("design:type", formation_entity_1.Formation)
], EvaluationTest.prototype, "formation", void 0);
exports.EvaluationTest = EvaluationTest = __decorate([
    (0, typeorm_1.Entity)('evaluation_tests')
], EvaluationTest);
//# sourceMappingURL=evaluation_test.entity.js.map