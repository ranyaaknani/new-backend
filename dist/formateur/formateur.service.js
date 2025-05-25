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
exports.FormateurService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const formation_entity_1 = require("../formation/entities/formation.entity");
const module_entity_1 = require("../formation/entities/module.entity");
const formateur_entity_1 = require("./formateur.entity");
let FormateurService = class FormateurService {
    formateurRepository;
    formationRepository;
    moduleRepository;
    constructor(formateurRepository, formationRepository, moduleRepository) {
        this.formateurRepository = formateurRepository;
        this.formationRepository = formationRepository;
        this.moduleRepository = moduleRepository;
    }
    async createFormateur(createFormateurDto) {
        const existingFormateur = await this.formateurRepository.findOne({
            where: { email: createFormateurDto.email },
        });
        if (existingFormateur) {
            throw new common_1.ConflictException('Un formateur avec cet email existe déjà');
        }
        const hashedPassword = createFormateurDto.password;
        const formateur = this.formateurRepository.create({
            ...createFormateurDto,
            password: hashedPassword,
        });
        const savedFormateur = await this.formateurRepository.save(formateur);
        const { ...result } = savedFormateur;
        return result;
    }
    async getAllFormateurs() {
        const formateurs = await this.formateurRepository.find({
            relations: ['formations'],
            select: ['id', 'nom', 'email', 'createdAt', 'updatedAt'],
        });
        return formateurs;
    }
    async getFormations(formateurId) {
        return this.formationRepository.find({
            where: { formateurId },
            relations: ['modules', 'participants', 'formateur'],
        });
    }
    async addFormation(formateurId, data) {
        const formation = this.formationRepository.create({
            ...data,
            formateurId,
            modules: data.modules?.map((module) => this.moduleRepository.create(module)) ||
                [],
        });
        const savedFormation = await this.formationRepository.save(formation);
        return this.formationRepository.findOneOrFail({
            where: { id: savedFormation.id },
            relations: ['modules', 'participants', 'formateur'],
        });
    }
};
exports.FormateurService = FormateurService;
exports.FormateurService = FormateurService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(formateur_entity_1.Formateur)),
    __param(1, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __param(2, (0, typeorm_1.InjectRepository)(module_entity_1.ModuleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FormateurService);
//# sourceMappingURL=formateur.service.js.map