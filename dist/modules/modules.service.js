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
exports.ModulesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const module_entity_1 = require("./entities/module.entity");
const typeorm_2 = require("typeorm");
const formation_entity_1 = require("../formation/entities/formation.entity");
const ressource_entity_1 = require("../ressource/entities/ressource.entity");
const ressource_service_1 = require("../ressource/ressource.service");
let ModulesService = class ModulesService {
    modulesRepository;
    formationsRepository;
    resourcesRepository;
    resourcesService;
    dataSource;
    constructor(modulesRepository, formationsRepository, resourcesRepository, resourcesService, dataSource) {
        this.modulesRepository = modulesRepository;
        this.formationsRepository = formationsRepository;
        this.resourcesRepository = resourcesRepository;
        this.resourcesService = resourcesService;
        this.dataSource = dataSource;
    }
    async create(createModuleDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const formation = await this.formationsRepository.findOne({
                where: { id: createModuleDto.formationId },
            });
            if (!formation) {
                throw new common_1.NotFoundException(`Formation with ID ${createModuleDto.formationId} not found`);
            }
            const module = this.modulesRepository.create({
                titre: createModuleDto.titre,
                order: createModuleDto.order || 0,
                description: createModuleDto.description,
                duration: createModuleDto.duration,
                questions: createModuleDto.questions || [],
                formationId: createModuleDto.formationId,
            });
            const savedModule = await queryRunner.manager.save(module);
            if (createModuleDto.resources?.length) {
                const resources = createModuleDto.resources.map((resourceData, index) => this.resourcesRepository.create({
                    title: resourceData.title,
                    type: resourceData.type,
                    videoLink: resourceData.videoLink,
                    pdfLink: resourceData.pdfLink,
                    textLink: resourceData.textLink,
                    content: resourceData.content,
                    duration: resourceData.duration,
                    order: resourceData.order !== undefined ? resourceData.order : index,
                    isCompleted: resourceData.isCompleted || false,
                    thumbnail: resourceData.thumbnail,
                    description: resourceData.description,
                    moduleId: savedModule.id,
                }));
                await queryRunner.manager.save(resources);
            }
            await queryRunner.commitTransaction();
            return this.findOne(savedModule.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.ConflictException(`Failed to create module: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return this.modulesRepository.find({
            relations: { formation: true, resources: true },
            order: { order: 'ASC', createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const module = await this.modulesRepository.findOne({
            where: { id },
            relations: { formation: true, resources: true },
            order: { resources: { order: 'ASC' } },
        });
        if (!module) {
            throw new common_1.NotFoundException(`Module with ID ${id} not found`);
        }
        return module;
    }
    async update(id, updateModuleDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const module = await this.findOne(id);
            if (updateModuleDto.titre)
                module.titre = updateModuleDto.titre;
            if (updateModuleDto.order !== undefined)
                module.order = updateModuleDto.order;
            if (updateModuleDto.description)
                module.description = updateModuleDto.description;
            if (updateModuleDto.duration)
                module.duration = updateModuleDto.duration;
            if (updateModuleDto.questions)
                module.questions = updateModuleDto.questions;
            await queryRunner.manager.save(module);
            if (updateModuleDto.resources) {
                await queryRunner.manager.delete(ressource_entity_1.ResourceEntity, { moduleId: id });
                const resources = updateModuleDto.resources.map((resourceData, index) => this.resourcesRepository.create({
                    title: resourceData.title,
                    type: resourceData.type,
                    videoLink: resourceData.videoLink,
                    pdfLink: resourceData.pdfLink,
                    textLink: resourceData.textLink,
                    content: resourceData.content,
                    duration: resourceData.duration,
                    order: resourceData.order !== undefined ? resourceData.order : index,
                    isCompleted: resourceData.isCompleted || false,
                    thumbnail: resourceData.thumbnail,
                    description: resourceData.description,
                    moduleId: id,
                }));
                await queryRunner.manager.save(resources);
            }
            await queryRunner.commitTransaction();
            return this.findOne(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.ConflictException(`Failed to update module: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const module = await this.findOne(id);
        await this.modulesRepository.remove(module);
    }
};
exports.ModulesService = ModulesService;
exports.ModulesService = ModulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(module_entity_1.ModuleEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __param(2, (0, typeorm_1.InjectRepository)(ressource_entity_1.ResourceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        ressource_service_1.ResourcesService,
        typeorm_2.DataSource])
], ModulesService);
//# sourceMappingURL=modules.service.js.map