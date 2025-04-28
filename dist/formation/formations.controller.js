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
exports.FormationsController = void 0;
const common_1 = require("@nestjs/common");
const formations_service_1 = require("./formations.service");
const create_formation_dto_1 = require("./dto/create-formation.dto");
let FormationsController = class FormationsController {
    formationsService;
    constructor(formationsService) {
        this.formationsService = formationsService;
    }
    create(createFormationDto) {
        return this.formationsService.create(createFormationDto);
    }
    findAll() {
        return this.formationsService.findAll();
    }
    findOne(id) {
        return this.formationsService.findOne(id);
    }
};
exports.FormationsController = FormationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_formation_dto_1.CreateFormationDto]),
    __metadata("design:returntype", Promise)
], FormationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FormationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormationsController.prototype, "findOne", null);
exports.FormationsController = FormationsController = __decorate([
    (0, common_1.Controller)('formations'),
    __metadata("design:paramtypes", [formations_service_1.FormationsService])
], FormationsController);
//# sourceMappingURL=formations.controller.js.map