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
exports.FormationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const formation_entity_1 = require("./entities/formation.entity");
let FormationsService = class FormationsService {
    formationsRepository;
    constructor(formationsRepository) {
        this.formationsRepository = formationsRepository;
    }
    create(createFormationDto) {
        const formation = this.formationsRepository.create(createFormationDto);
        return this.formationsRepository.save(formation);
    }
    findAll() {
        return this.formationsRepository.find({ relations: ['participants'] });
    }
    async findOne(id) {
        const formation = await this.formationsRepository.findOne({
            where: { id },
            relations: ['participants'],
        });
        if (!formation) {
            throw new common_1.NotFoundException(`Formation with ID ${id} not found`);
        }
        return formation;
    }
};
exports.FormationsService = FormationsService;
exports.FormationsService = FormationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FormationsService);
//# sourceMappingURL=formations.service.js.map