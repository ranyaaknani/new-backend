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
exports.FormateurController = void 0;
const common_1 = require("@nestjs/common");
const formateur_service_1 = require("./formateur.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_formation_dto_1 = require("../formation/dto/create-formation.dto");
const create_formateur_dto_1 = require("./dto/create-formateur.dto");
let FormateurController = class FormateurController {
    formateurService;
    constructor(formateurService) {
        this.formateurService = formateurService;
    }
    createFormateur(createFormateurDto) {
        return this.formateurService.createFormateur(createFormateurDto);
    }
    async getFormations(req) {
        const formateurId = req.user.id;
        return this.formateurService.getFormations(formateurId);
    }
    async addFormation(createFormationDto, req) {
        const formateurId = req.user.id;
        return this.formateurService.addFormation(formateurId, createFormationDto);
    }
    getAllFormateurs() {
        return this.formateurService.getAllFormateurs();
    }
};
exports.FormateurController = FormateurController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_formateur_dto_1.CreateFormateurDto]),
    __metadata("design:returntype", void 0)
], FormateurController.prototype, "createFormateur", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('formations'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FormateurController.prototype, "getFormations", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('formations'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_formation_dto_1.CreateFormationDto, Object]),
    __metadata("design:returntype", Promise)
], FormateurController.prototype, "addFormation", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormateurController.prototype, "getAllFormateurs", null);
exports.FormateurController = FormateurController = __decorate([
    (0, common_1.Controller)('formateur'),
    __metadata("design:paramtypes", [formateur_service_1.FormateurService])
], FormateurController);
//# sourceMappingURL=formateur.controller.js.map