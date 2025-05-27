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
exports.Section = void 0;
const typeorm_1 = require("typeorm");
const quiz_entity_1 = require("../../quiz/entities/quiz.entity");
const module_entity_1 = require("./module.entity");
let Section = class Section {
    id;
    titre;
    module;
    quizzes;
};
exports.Section = Section;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Section.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Section.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => module_entity_1.Module, (module) => module.sections),
    __metadata("design:type", module_entity_1.Module)
], Section.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_entity_1.Quiz, (quiz) => quiz.section, { cascade: true }),
    __metadata("design:type", Array)
], Section.prototype, "quizzes", void 0);
exports.Section = Section = __decorate([
    (0, typeorm_1.Entity)()
], Section);
//# sourceMappingURL=section.entity.js.map