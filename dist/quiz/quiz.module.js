"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quiz_entity_1 = require("./entities/quiz.entity");
const formation_entity_1 = require("../formation/entities/formation.entity");
const module_entity_1 = require("../modules/entities/module.entity");
const quiz_controller_1 = require("./quiz.controller");
const quiz_service_1 = require("./quiz.service");
let QuizModule = class QuizModule {
};
exports.QuizModule = QuizModule;
exports.QuizModule = QuizModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([quiz_entity_1.Quiz, quiz_entity_1.QuizQuestion, formation_entity_1.Formation, module_entity_1.ModuleEntity]),
        ],
        controllers: [quiz_controller_1.QuizController],
        providers: [quiz_service_1.QuizService],
        exports: [quiz_service_1.QuizService],
    })
], QuizModule);
//# sourceMappingURL=quiz.module.js.map