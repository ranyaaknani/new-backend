"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantModule = void 0;
const common_1 = require("@nestjs/common");
const participant_controller_1 = require("./participant.controller");
const typeorm_1 = require("@nestjs/typeorm");
const participant_entity_1 = require("./entities/participant.entity");
const formation_entity_1 = require("../formation/entities/formation.entity");
const participant_service_1 = require("./participant.service");
let ParticipantModule = class ParticipantModule {
};
exports.ParticipantModule = ParticipantModule;
exports.ParticipantModule = ParticipantModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([participant_entity_1.Participant, formation_entity_1.Formation])],
        controllers: [participant_controller_1.ParticipantsController],
        providers: [participant_service_1.ParticipantsService],
        exports: [participant_service_1.ParticipantsService],
    })
], ParticipantModule);
//# sourceMappingURL=participant.module.js.map