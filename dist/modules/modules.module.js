"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const module_entity_1 = require("./entities/module.entity");
const formation_entity_1 = require("../formation/entities/formation.entity");
const ressource_entity_1 = require("../ressource/entities/ressource.entity");
const modules_controller_1 = require("./modules.controller");
const modules_service_1 = require("./modules.service");
let ModulesModule = class ModulesModule {
};
exports.ModulesModule = ModulesModule;
exports.ModulesModule = ModulesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([module_entity_1.ModuleEntity, formation_entity_1.Formation, ressource_entity_1.ResourceEntity]),
        ],
        controllers: [modules_controller_1.ModulesController],
        providers: [modules_service_1.ModulesService],
        exports: [modules_service_1.ModulesService],
    })
], ModulesModule);
//# sourceMappingURL=modules.module.js.map