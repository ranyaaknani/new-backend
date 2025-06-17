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
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ressource_entity_1 = require("./entities/ressource.entity");
const typeorm_2 = require("typeorm");
const module_entity_1 = require("../modules/entities/module.entity");
let ResourcesService = class ResourcesService {
    resourcesRepository;
    modulesRepository;
    dataSource;
    constructor(resourcesRepository, modulesRepository, dataSource) {
        this.resourcesRepository = resourcesRepository;
        this.modulesRepository = modulesRepository;
        this.dataSource = dataSource;
    }
    async create(createResourceDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const module = await this.modulesRepository.findOne({
                where: { id: createResourceDto.moduleId },
            });
            if (!module) {
                throw new common_1.NotFoundException(`Module with ID ${createResourceDto.moduleId} not found`);
            }
            const resource = this.resourcesRepository.create({
                title: createResourceDto.title,
                type: createResourceDto.type,
                url: createResourceDto.url,
                content: createResourceDto.content,
                tableData: createResourceDto.tableData,
                fileName: createResourceDto.fileName,
                fileSize: createResourceDto.fileSize,
                previewUrl: createResourceDto.previewUrl,
                duration: createResourceDto.duration,
                order: createResourceDto.order ?? 0,
                isSaved: createResourceDto.isSaved || false,
                thumbnail: createResourceDto.thumbnail,
                description: createResourceDto.description,
                moduleId: createResourceDto.moduleId,
            });
            const savedResource = await queryRunner.manager.save(resource);
            await queryRunner.commitTransaction();
            return this.findOne(savedResource.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.ConflictException(`Failed to create resource: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return this.resourcesRepository.find({
            relations: { module: true },
            order: { order: 'ASC', createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const resource = await this.resourcesRepository.findOne({
            where: { id },
            relations: { module: true },
        });
        if (!resource) {
            throw new common_1.NotFoundException(`Resource with ID ${id} not found`);
        }
        return resource;
    }
    async update(id, updateResourceDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const resource = await this.findOne(id);
            if (updateResourceDto.title)
                resource.title = updateResourceDto.title;
            if (updateResourceDto.type)
                resource.type = updateResourceDto.type;
            if (updateResourceDto.url)
                resource.url = updateResourceDto.url;
            if (updateResourceDto.content)
                resource.content = updateResourceDto.content;
            if (updateResourceDto.tableData)
                resource.tableData = updateResourceDto.tableData;
            if (updateResourceDto.fileName)
                resource.fileName = updateResourceDto.fileName;
            if (updateResourceDto.fileSize)
                resource.fileSize = updateResourceDto.fileSize;
            if (updateResourceDto.previewUrl)
                resource.previewUrl = updateResourceDto.previewUrl;
            if (updateResourceDto.duration)
                resource.duration = updateResourceDto.duration;
            if (updateResourceDto.order !== undefined)
                resource.order = updateResourceDto.order;
            if (updateResourceDto.isSaved !== undefined)
                resource.isSaved = updateResourceDto.isSaved;
            if (updateResourceDto.isSaved !== undefined)
                resource.isSaved = updateResourceDto.isSaved;
            if (updateResourceDto.thumbnail)
                resource.thumbnail = updateResourceDto.thumbnail;
            if (updateResourceDto.description)
                resource.description = updateResourceDto.description;
            await queryRunner.manager.save(resource);
            await queryRunner.commitTransaction();
            return this.findOne(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.ConflictException(`Failed to update resource: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const resource = await this.findOne(id);
        await this.resourcesRepository.remove(resource);
    }
};
exports.ResourcesService = ResourcesService;
exports.ResourcesService = ResourcesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ressource_entity_1.ResourceEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(module_entity_1.ModuleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ResourcesService);
//# sourceMappingURL=ressource.service.js.map