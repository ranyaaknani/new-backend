"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormateurModule = void 0;
const common_1 = require("@nestjs/common");
const formateur_controller_1 = require("./formateur.controller");
const formateur_service_1 = require("./formateur.service");
const typeorm_1 = require("@nestjs/typeorm");
const formation_entity_1 = require("../formation/entities/formation.entity");
const formateur_entity_1 = require("./formateur.entity");
const module_entity_1 = require("../modules/entities/module.entity");
let FormateurModule = class FormateurModule {
};
exports.FormateurModule = FormateurModule;
exports.FormateurModule = FormateurModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([formateur_entity_1.Formateur, formation_entity_1.Formation, module_entity_1.ModuleEntity])],
        controllers: [formateur_controller_1.FormateurController],
        providers: [formateur_service_1.FormateurService],
        exports: [formateur_service_1.FormateurService],
    })
], FormateurModule);
//# sourceMappingURL=formateur.module.js.map