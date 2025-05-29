"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const formations_service_1 = require("./formations.service");
const formations_controller_1 = require("./formations.controller");
const formation_entity_1 = require("./entities/formation.entity");
const module_entity_1 = require("../modules/entities/module.entity");
const ressource_entity_1 = require("../ressource/entities/ressource.entity");
const invitation_entity_1 = require("../invitation/invitation.entity");
const formateur_entity_1 = require("../formateur/formateur.entity");
const formateur_service_1 = require("../formateur/formateur.service");
let FormationsModule = class FormationsModule {
};
exports.FormationsModule = FormationsModule;
exports.FormationsModule = FormationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                formation_entity_1.Formation,
                module_entity_1.ModuleEntity,
                ressource_entity_1.ResourceEntity,
                invitation_entity_1.InvitationEntity,
                formateur_entity_1.Formateur,
            ]),
        ],
        controllers: [formations_controller_1.FormationsController],
        providers: [formations_service_1.FormationsService, formateur_service_1.FormateurService],
        exports: [formations_service_1.FormationsService],
    })
], FormationsModule);
//# sourceMappingURL=formations.module.js.map