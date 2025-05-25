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
const module_entity_1 = require("./entities/module.entity");
let FormationsService = class FormationsService {
    formationsRepository;
    modulesRepository;
    constructor(formationsRepository, modulesRepository) {
        this.formationsRepository = formationsRepository;
        this.modulesRepository = modulesRepository;
    }
    async create(createFormationDto) {
        const formation = this.formationsRepository.create({
            titre: createFormationDto.titre,
            domaine: createFormationDto.domaine,
            image: createFormationDto.image,
            description: createFormationDto.description,
            objectifs: createFormationDto.objectifs,
            accessType: createFormationDto.accessType,
            invitation: createFormationDto.invitation,
            formateurId: createFormationDto.formateurId,
        });
        const savedFormation = await this.formationsRepository.save(formation);
        if (createFormationDto.modules?.length) {
            const modules = createFormationDto.modules.map((moduleData) => this.modulesRepository.create({
                titre: moduleData.titre,
                questions: moduleData.questions || [],
                resources: moduleData.resources || [],
                formation: savedFormation,
            }));
            await this.modulesRepository.save(modules);
        }
        return this.findOne(savedFormation.id);
    }
    findAll() {
        return this.formationsRepository.find({
            relations: ['participants', 'modules', 'formateur'],
        });
    }
    async findOne(id) {
        const formation = await this.formationsRepository.findOne({
            where: { id },
            relations: ['participants', 'modules', 'formateur'],
        });
        if (!formation) {
            throw new common_1.NotFoundException(`Formation with ID ${id} not found`);
        }
        return formation;
    }
    async update(id, updateData) {
        const formation = await this.findOne(id);
        Object.assign(formation, {
            titre: updateData.titre || formation.titre,
            image: updateData.image || formation.image,
            domaine: updateData.domaine || formation.domaine,
            description: updateData.description || formation.description,
            objectifs: updateData.objectifs || formation.objectifs,
            accessType: updateData.accessType || formation.accessType,
            invitation: updateData.invitation || formation.invitation,
        });
        await this.formationsRepository.save(formation);
        if (updateData.modules) {
            await this.modulesRepository.delete({ formationId: id });
            const modules = updateData.modules.map((moduleData) => {
                return this.modulesRepository.create({
                    titre: moduleData.titre,
                    questions: moduleData.questions || [],
                    resources: moduleData.resources || [],
                    formation: formation,
                });
            });
            await this.modulesRepository.save(modules);
        }
        return this.findOne(id);
    }
    async remove(id) {
        const formation = await this.findOne(id);
        await this.formationsRepository.remove(formation);
    }
};
exports.FormationsService = FormationsService;
exports.FormationsService = FormationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __param(1, (0, typeorm_1.InjectRepository)(module_entity_1.ModuleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FormationsService);
//# sourceMappingURL=formations.service.js.map