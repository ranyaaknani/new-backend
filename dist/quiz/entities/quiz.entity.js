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
exports.QuizQuestion = exports.Quiz = void 0;
const formation_entity_1 = require("../../formation/entities/formation.entity");
const module_entity_1 = require("../../modules/entities/module.entity");
const typeorm_1 = require("typeorm");
let Quiz = class Quiz {
    id;
    description;
    isActive;
    moduleId;
    formationId;
    module;
    formation;
    questions;
    createdAt;
    updatedAt;
};
exports.Quiz = Quiz;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Quiz.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Quiz.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Quiz.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Quiz.prototype, "formationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => module_entity_1.ModuleEntity, (module) => module.quizzes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'moduleId' }),
    __metadata("design:type", module_entity_1.ModuleEntity)
], Quiz.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => formation_entity_1.Formation, (formation) => formation.quizzes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'formationId' }),
    __metadata("design:type", formation_entity_1.Formation)
], Quiz.prototype, "formation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => QuizQuestion, (question) => question.quiz, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Quiz.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Quiz.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Quiz.prototype, "updatedAt", void 0);
exports.Quiz = Quiz = __decorate([
    (0, typeorm_1.Entity)('quizzes')
], Quiz);
let QuizQuestion = class QuizQuestion {
    id;
    question;
    options;
    correctAnswer;
    order;
    quizId;
    quiz;
    createdAt;
    updatedAt;
};
exports.QuizQuestion = QuizQuestion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizQuestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuizQuestion.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], QuizQuestion.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], QuizQuestion.prototype, "correctAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], QuizQuestion.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], QuizQuestion.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Quiz, (quiz) => quiz.questions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'quizId' }),
    __metadata("design:type", Quiz)
], QuizQuestion.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizQuestion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuizQuestion.prototype, "updatedAt", void 0);
exports.QuizQuestion = QuizQuestion = __decorate([
    (0, typeorm_1.Entity)('quiz_questions')
], QuizQuestion);
//# sourceMappingURL=quiz.entity.js.map