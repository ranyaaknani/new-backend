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
const ressource_entity_1 = require("../ressource/entities/ressource.entity");
const invitation_entity_1 = require("../invitation/invitation.entity");
let FormationsService = class FormationsService {
    formationsRepository;
    modulesRepository;
    resourcesRepository;
    invitationsRepository;
    constructor(formationsRepository, modulesRepository, resourcesRepository, invitationsRepository) {
        this.formationsRepository = formationsRepository;
        this.modulesRepository = modulesRepository;
        this.resourcesRepository = resourcesRepository;
        this.invitationsRepository = invitationsRepository;
    }
    async create(createFormationDto) {
        const formation = this.formationsRepository.create({
            titre: createFormationDto.titre,
            domaine: createFormationDto.domaine,
            image: createFormationDto.image,
            description: createFormationDto.description,
            objectifs: createFormationDto.objectifs,
            accessType: createFormationDto.accessType,
            formateurId: createFormationDto.formateurId,
        });
        const savedFormation = await this.formationsRepository.save(formation);
        if (createFormationDto.invitation) {
            const invitation = this.invitationsRepository.create({
                mode: createFormationDto.invitation.mode,
                emails: createFormationDto.invitation.emails,
                fromEmails: createFormationDto.invitation.fromEmails,
                toEmails: createFormationDto.invitation.toEmails,
                invitationLink: createFormationDto.invitation.invitationLink,
                linkGenerated: createFormationDto.invitation.linkGenerated || false,
                csvFile: createFormationDto?.invitation?.csvFile,
                csvImage: createFormationDto.invitation.csvImage,
                subject: createFormationDto.invitation.subject,
                message: createFormationDto.invitation.message,
                expiresAt: createFormationDto.invitation.expiresAt
                    ? new Date(createFormationDto.invitation.expiresAt)
                    : undefined,
                isActive: createFormationDto.invitation.isActive !== false,
                formationId: savedFormation.id,
            });
            await this.invitationsRepository.save(invitation);
        }
        if (createFormationDto.modules?.length) {
            for (const moduleData of createFormationDto.modules) {
                const module = this.modulesRepository.create({
                    titre: moduleData.titre,
                    order: moduleData.order || 0,
                    description: moduleData.description,
                    duration: moduleData.duration,
                    questions: moduleData.questions || [],
                    formationId: savedFormation.id,
                });
                const savedModule = await this.modulesRepository.save(module);
                if (moduleData.resources?.length) {
                    const resources = moduleData.resources.map((resourceData, index) => this.resourcesRepository.create({
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
                    await this.resourcesRepository.save(resources);
                }
            }
        }
        return this.findOne(savedFormation.id);
    }
    async findAll() {
        return this.formationsRepository.find({
            relations: {
                formateur: true,
                modules: {
                    resources: true,
                },
                invitations: true,
                participants: true,
            },
            order: {
                createdAt: 'DESC',
                modules: {
                    order: 'ASC',
                    resources: {
                        order: 'ASC',
                    },
                },
            },
        });
    }
    async findOne(id) {
        const formation = await this.formationsRepository.findOne({
            where: { id },
            relations: {
                formateur: true,
                modules: {
                    resources: true,
                },
                invitations: true,
                participants: true,
            },
            order: {
                modules: {
                    order: 'ASC',
                    resources: {
                        order: 'ASC',
                    },
                },
            },
        });
        if (!formation) {
            throw new Error(`Formation with ID ${id} not found`);
        }
        return formation;
    }
    async update(id, updateFormationDto) {
        const formation = await this.findOne(id);
        if (updateFormationDto.titre)
            formation.titre = updateFormationDto.titre;
        if (updateFormationDto.domaine)
            formation.domaine = updateFormationDto.domaine;
        if (updateFormationDto.image !== undefined)
            formation.image = updateFormationDto.image;
        if (updateFormationDto.description)
            formation.description = updateFormationDto.description;
        if (updateFormationDto.objectifs)
            formation.objectifs = updateFormationDto.objectifs;
        if (updateFormationDto.accessType)
            formation.accessType = updateFormationDto.accessType;
        await this.formationsRepository.save(formation);
        if (updateFormationDto.invitation) {
            await this.invitationsRepository.delete({ formationId: id });
            const invitation = this.invitationsRepository.create({
                mode: updateFormationDto.invitation.mode,
                emails: updateFormationDto.invitation.emails,
                fromEmails: updateFormationDto.invitation.fromEmails,
                toEmails: updateFormationDto.invitation.toEmails,
                invitationLink: updateFormationDto.invitation.invitationLink,
                linkGenerated: updateFormationDto.invitation.linkGenerated || false,
                csvFile: updateFormationDto.invitation.csvFile,
                csvImage: updateFormationDto.invitation.csvImage,
                subject: updateFormationDto.invitation.subject,
                message: updateFormationDto.invitation.message,
                expiresAt: updateFormationDto.invitation.expiresAt
                    ? new Date(updateFormationDto.invitation.expiresAt)
                    : undefined,
                isActive: updateFormationDto.invitation.isActive !== false,
                formationId: id,
            });
            await this.invitationsRepository.save(invitation);
        }
        if (updateFormationDto.modules) {
            await this.modulesRepository.delete({ formationId: id });
            for (const moduleData of updateFormationDto.modules) {
                const module = this.modulesRepository.create({
                    titre: moduleData.titre,
                    order: moduleData.order || 0,
                    description: moduleData.description,
                    duration: moduleData.duration,
                    questions: moduleData.questions || [],
                    formationId: id,
                });
                const savedModule = await this.modulesRepository.save(module);
                if (moduleData.resources?.length) {
                    const resources = moduleData.resources.map((resourceData, index) => this.resourcesRepository.create({
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
                    await this.resourcesRepository.save(resources);
                }
            }
        }
        return this.findOne(id);
    }
    async remove(id) {
        const formation = await this.findOne(id);
        await this.formationsRepository.remove(formation);
    }
    async findByFormateur(formateurId) {
        return this.formationsRepository.find({
            where: { formateurId },
            relations: {
                modules: {
                    resources: true,
                },
                invitations: true,
                participants: true,
            },
            order: {
                createdAt: 'DESC',
                modules: {
                    order: 'ASC',
                    resources: {
                        order: 'ASC',
                    },
                },
            },
        });
    }
    async findPublicFormations() {
        return this.formationsRepository.find({
            where: { accessType: 'public' },
            relations: {
                formateur: true,
                modules: {
                    resources: true,
                },
            },
            order: {
                createdAt: 'DESC',
                modules: {
                    order: 'ASC',
                    resources: {
                        order: 'ASC',
                    },
                },
            },
        });
    }
};
exports.FormationsService = FormationsService;
exports.FormationsService = FormationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __param(1, (0, typeorm_1.InjectRepository)(module_entity_1.ModuleEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(ressource_entity_1.ResourceEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(invitation_entity_1.InvitationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FormationsService);
//# sourceMappingURL=formations.service.js.map