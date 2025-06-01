"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const certificate_entity_1 = require("./entities/certificate.entity");
const user_entity_1 = require("../users/user.entity");
const certificat_controller_1 = require("./certificat.controller");
const certificat_service_1 = require("./certificat.service");
const formation_entity_1 = require("../formation/entities/formation.entity");
let CertificatModule = class CertificatModule {
};
exports.CertificatModule = CertificatModule;
exports.CertificatModule = CertificatModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([certificate_entity_1.Certificat, user_entity_1.User, formation_entity_1.Formation])],
        controllers: [certificat_controller_1.CertificatController],
        providers: [certificat_service_1.CertificatService],
        exports: [certificat_service_1.CertificatService],
    })
], CertificatModule);
//# sourceMappingURL=certificat.module.js.map