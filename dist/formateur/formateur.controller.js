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
const create_formateur_dto_1 = require("./dto/create-formateur.dto");
const update_formateur_dto_1 = require("./dto/update-formateur.dto");
let FormateurController = class FormateurController {
    formateurService;
    constructor(formateurService) {
        this.formateurService = formateurService;
    }
    createFormateur(createFormateurDto) {
        return this.formateurService.createFormateur(createFormateurDto);
    }
    getAllFormateurs() {
        return this.formateurService.getAllFormateurs();
    }
    updateFormateur(id, updateFormateurDto) {
        return this.formateurService.updateFormateur(id, updateFormateurDto);
    }
    deleteFormateur(id) {
        return this.formateurService.deleteFormateur(id);
    }
    getFormateurById(id) {
        return this.formateurService.getFormateurById(id);
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
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormateurController.prototype, "getAllFormateurs", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_formateur_dto_1.UpdateFormateurDto]),
    __metadata("design:returntype", void 0)
], FormateurController.prototype, "updateFormateur", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FormateurController.prototype, "deleteFormateur", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FormateurController.prototype, "getFormateurById", null);
exports.FormateurController = FormateurController = __decorate([
    (0, common_1.Controller)('formateur'),
    __metadata("design:paramtypes", [formateur_service_1.FormateurService])
], FormateurController);
//# sourceMappingURL=formateur.controller.js.map