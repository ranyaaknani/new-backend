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
exports.ParticipantsController = void 0;
const common_1 = require("@nestjs/common");
const create_participant_dto_1 = require("./dto/create-participant.dto");
const participant_service_1 = require("./participant.service");
const update_participant_dto_1 = require("./dto/update-participant.dto");
let ParticipantsController = class ParticipantsController {
    participantsService;
    constructor(participantsService) {
        this.participantsService = participantsService;
    }
    create(createParticipantDto) {
        return this.participantsService.create(createParticipantDto);
    }
    findAll() {
        return this.participantsService.findAll();
    }
    getStatistics() {
        return this.participantsService.getStatistics();
    }
    findByFormateur(formateurId) {
        return this.participantsService.findByFormateur(formateurId);
    }
    findByFormation(formationId) {
        return this.participantsService.findByFormation(formationId);
    }
    findOne(id) {
        return this.participantsService.findOne(id);
    }
    update(id, updateParticipantDto) {
        return this.participantsService.update(id, updateParticipantDto);
    }
    updateStatus(id, status) {
        return this.participantsService.updateStatus(id, status);
    }
    toggleActive(id) {
        return this.participantsService.toggleActive(id);
    }
    generateCertificate(id) {
        return this.participantsService.generateCertificate(id);
    }
    sendEmailReminder(id) {
        return this.participantsService.sendEmailReminder(id);
    }
    remove(id) {
        return this.participantsService.remove(id);
    }
};
exports.ParticipantsController = ParticipantsController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_participant_dto_1.CreateParticipantDto]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('formateur/:formateurId'),
    __param(0, (0, common_1.Param)('formateurId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "findByFormateur", null);
__decorate([
    (0, common_1.Get)('formation/:formationId'),
    __param(0, (0, common_1.Param)('formationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "findByFormation", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_participant_dto_1.UpdateParticipantDto]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-active'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Post)(':id/certificate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "generateCertificate", null);
__decorate([
    (0, common_1.Post)(':id/email-reminder'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "sendEmailReminder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "remove", null);
exports.ParticipantsController = ParticipantsController = __decorate([
    (0, common_1.Controller)('participants'),
    __metadata("design:paramtypes", [participant_service_1.ParticipantsService])
], ParticipantsController);
//# sourceMappingURL=participant.controller.js.map