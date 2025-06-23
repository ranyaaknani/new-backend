"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationTestModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const evaluation_test_entity_1 = require("./evaluation_test.entity");
const questions_entity_1 = require("../question/questions.entity");
const evaluation_test_controller_1 = require("./evaluation-test.controller");
const evaluation_test_service_1 = require("./evaluation-test.service");
let EvaluationTestModule = class EvaluationTestModule {
};
exports.EvaluationTestModule = EvaluationTestModule;
exports.EvaluationTestModule = EvaluationTestModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([evaluation_test_entity_1.EvaluationTest, questions_entity_1.Question])],
        controllers: [evaluation_test_controller_1.EvaluationTestController],
        providers: [evaluation_test_service_1.EvaluationTestService],
        exports: [evaluation_test_service_1.EvaluationTestService],
    })
], EvaluationTestModule);
//# sourceMappingURL=evaluation-test.module.js.map