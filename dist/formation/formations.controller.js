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
const update_formation_dto_1 = require("./dto/update-formation.dto");
const platform_express_1 = require("@nestjs/platform-express");
let FormationsController = class FormationsController {
    formationsService;
    constructor(formationsService) {
        this.formationsService = formationsService;
    }
    async create(createFormationDto) {
        try {
            console.log('Received DTO:', createFormationDto);
            const result = await this.formationsService.create(createFormationDto);
            return {
                success: true,
                message: 'Formation created successfully',
                data: result,
            };
        }
        catch (error) {
            console.error('Controller error:', error);
            return {
                success: false,
                message: 'Failed to create formation',
                error: error.message,
            };
        }
    }
    findAll() {
        return this.formationsService.findAll();
    }
    findOne(id) {
        return this.formationsService.findOne(id);
    }
    update(id, updateFormationDto) {
        return this.formationsService.update(id, updateFormationDto);
    }
    remove(id) {
        return this.formationsService.remove(id);
    }
    async getParticipants(formationId) {
        return this.formationsService.getParticipants(formationId);
    }
    async getParticipantsByFormation(formationId) {
        try {
            const participants = await this.formationsService.getParticipantsByFormationId(formationId);
            return participants.map((participant) => ({
                id: participant.id,
                email: participant.email,
                name: participant.name,
                role: participant.role,
                status: participant.status,
                createdAt: participant.createdAt,
                updatedAt: participant.updatedAt,
            }));
        }
        catch (error) {
            console.error('Error fetching participants:', error);
            throw new common_1.HttpException(error.message || 'Failed to fetch participants', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FormationsController = FormationsController;
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('csvFile')),
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
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_formation_dto_1.UpdateFormationDto]),
    __metadata("design:returntype", Promise)
], FormationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/participants'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormationsController.prototype, "getParticipants", null);
__decorate([
    (0, common_1.Get)('formation/:formationId'),
    __param(0, (0, common_1.Param)('formationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormationsController.prototype, "getParticipantsByFormation", null);
exports.FormationsController = FormationsController = __decorate([
    (0, common_1.Controller)('formations'),
    __metadata("design:paramtypes", [formations_service_1.FormationsService])
], FormationsController);
//# sourceMappingURL=formations.controller.js.map