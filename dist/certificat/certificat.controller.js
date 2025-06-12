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
exports.CertificatController = void 0;
const common_1 = require("@nestjs/common");
const certificat_service_1 = require("./certificat.service");
const create_certification_dto_1 = require("./dto/create-certification.dto");
const update_certification_dto_1 = require("./dto/update-certification.dto");
const path = require("path");
const fs = require("fs");
let CertificatController = class CertificatController {
    certificatService;
    constructor(certificatService) {
        this.certificatService = certificatService;
    }
    async create(createCertificateDto) {
        return this.certificatService.create(createCertificateDto);
    }
    serveCertificatePdf(filename, res) {
        try {
            const filePath = path.join(process.cwd(), 'uploads', 'certificates', filename);
            if (!fs.existsSync(filePath)) {
                throw new common_1.NotFoundException('Certificate PDF not found');
            }
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.NotFoundException('Certificate PDF not found');
        }
    }
    findAll(participantId) {
        if (participantId) {
            return this.certificatService.findByParticipant(participantId);
        }
        return this.certificatService.findAll();
    }
    findOne(id) {
        return this.certificatService.findOne(id);
    }
    update(id, updateCertificateDto) {
        return this.certificatService.update(id, updateCertificateDto);
    }
    remove(id) {
        return this.certificatService.remove(id);
    }
    async generateCertificate(body) {
        const createCertificateDto = {
            nomParticipant: body.participantName,
            formation: body.formationName,
            participantId: body.participantId,
            formationId: body.formationId,
        };
        return this.certificatService.create(createCertificateDto);
    }
};
exports.CertificatController = CertificatController;
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_certification_dto_1.CreateCertificateDto]),
    __metadata("design:returntype", Promise)
], CertificatController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CertificatController.prototype, "serveCertificatePdf", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('participantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_certification_dto_1.UpdateCertificateDto]),
    __metadata("design:returntype", void 0)
], CertificatController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CertificatController.prototype, "generateCertificate", null);
exports.CertificatController = CertificatController = __decorate([
    (0, common_1.Controller)('certificats'),
    __metadata("design:paramtypes", [certificat_service_1.CertificatService])
], CertificatController);
//# sourceMappingURL=certificat.controller.js.map