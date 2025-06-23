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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationTestController = void 0;
const common_1 = require("@nestjs/common");
const evaluation_test_service_1 = require("./evaluation-test.service");
const create_ecaluationTest_dto_1 = require("./dto/create-ecaluationTest.dto");
const update_ecaluationTest_dto_1 = require("./dto/update-ecaluationTest.dto");
let EvaluationTestController = class EvaluationTestController {
    evaluationTestService;
    constructor(evaluationTestService) {
        this.evaluationTestService = evaluationTestService;
    }
    create(createEvaluationTestDto) {
        return this.evaluationTestService.create(createEvaluationTestDto);
    }
    findAll() {
        return this.evaluationTestService.findAll();
    }
    findEnabledTests() {
        return this.evaluationTestService.findEnabledTests();
    }
    findOne(id) {
        return this.evaluationTestService.findOne(id);
    }
    update(id, updateEvaluationTestDto) {
        return this.evaluationTestService.update(id, updateEvaluationTestDto);
    }
    remove(id) {
        return this.evaluationTestService.remove(id);
    }
};
exports.EvaluationTestController = EvaluationTestController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ecaluationTest_dto_1.CreateEvaluationTestDto]),
    __metadata("design:returntype", void 0)
], EvaluationTestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EvaluationTestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('enabled'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EvaluationTestController.prototype, "findEnabledTests", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvaluationTestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ecaluationTest_dto_1.UpdateEvaluationTestDto]),
    __metadata("design:returntype", void 0)
], EvaluationTestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvaluationTestController.prototype, "remove", null);
exports.EvaluationTestController = EvaluationTestController = __decorate([
    (0, common_1.Controller)('evaluation-tests'),
    __metadata("design:paramtypes", [evaluation_test_service_1.EvaluationTestService])
], EvaluationTestController);
//# sourceMappingURL=evaluation-test.controller.js.map