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
const ressource_entity_1 = require("../ressource/entities/ressource.entity");
const invitation_entity_1 = require("../invitation/invitation.entity");
const module_entity_1 = require("../modules/entities/module.entity");
const user_entity_1 = require("../users/user.entity");
let FormationsService = class FormationsService {
    formationsRepository;
    modulesRepository;
    invitationsRepository;
    resourcesRepository;
    userRepository;
    dataSource;
    constructor(formationsRepository, modulesRepository, invitationsRepository, resourcesRepository, userRepository, dataSource) {
        this.formationsRepository = formationsRepository;
        this.modulesRepository = modulesRepository;
        this.invitationsRepository = invitationsRepository;
        this.resourcesRepository = resourcesRepository;
        this.userRepository = userRepository;
        this.dataSource = dataSource;
    }
    async create(createFormationDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userRepository.findOne({
                where: { id: createFormationDto.userId },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${createFormationDto.userId} not found`);
            }
            const formation = this.formationsRepository.create({
                titre: createFormationDto.titre,
                domaine: createFormationDto.domaine,
                image: createFormationDto.image,
                description: createFormationDto.description,
                objectifs: createFormationDto.objectifs,
                accessType: createFormationDto.accessType,
                userId: createFormationDto.userId,
            });
            const savedFormation = await queryRunner.manager.save(formation);
            if (createFormationDto.invitation) {
                const invitation = this.invitationsRepository.create({
                    mode: createFormationDto.invitation.mode,
                    emails: createFormationDto.invitation.emails,
                    subject: createFormationDto.invitation.subject,
                    message: createFormationDto.invitation.message,
                    formationId: savedFormation.id,
                });
                await queryRunner.manager.save(invitation);
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
                    const savedModule = await queryRunner.manager.save(module);
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
                        await queryRunner.manager.save(resources);
                    }
                }
            }
            await queryRunner.commitTransaction();
            return this.findOne(savedFormation.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.ConflictException(`Failed to create formation: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return this.formationsRepository.find({
            relations: {
                user: true,
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
                user: true,
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
            throw new common_1.NotFoundException(`Formation with ID ${id} not found`);
        }
        return formation;
    }
    async update(id, updateFormationDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const formation = await this.formationsRepository.findOne({
                where: { id },
                relations: ['participants'],
            });
            if (!formation) {
                throw new common_1.NotFoundException(`Formation with ID ${id} not found`);
            }
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
            if (updateFormationDto.userId)
                formation.userId = updateFormationDto.userId;
            if (updateFormationDto.participantIds !== undefined) {
                if (updateFormationDto.participantIds.length > 0) {
                    const validUsers = await this.userRepository.find({
                        where: {
                            id: (0, typeorm_2.In)(updateFormationDto.participantIds),
                        },
                    });
                    if (validUsers.length !== updateFormationDto.participantIds.length) {
                        const validUserIds = validUsers.map((user) => user.id);
                        const invalidIds = updateFormationDto.participantIds.filter((id) => !validUserIds.includes(id));
                        throw new common_1.BadRequestException(`Invalid participant user IDs or users don't have participant role: ${invalidIds.join(', ')}`);
                    }
                    formation.participants = validUsers;
                }
                else {
                    formation.participants = [];
                }
            }
            await queryRunner.manager.save(formation);
            if (updateFormationDto.invitation) {
                await queryRunner.manager.delete(invitation_entity_1.InvitationEntity, { formationId: id });
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
                await queryRunner.manager.save(invitation);
            }
            if (updateFormationDto.modules) {
                await queryRunner.manager.delete(module_entity_1.ModuleEntity, { formationId: id });
                for (const moduleData of updateFormationDto.modules) {
                    const module = this.modulesRepository.create({
                        titre: moduleData.titre,
                        order: moduleData.order || 0,
                        description: moduleData.description,
                        duration: moduleData.duration,
                        questions: moduleData.questions || [],
                        formationId: id,
                    });
                    const savedModule = await queryRunner.manager.save(module);
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
                        await queryRunner.manager.save(resources);
                    }
                }
            }
            await queryRunner.commitTransaction();
            return this.findOne(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.ConflictException(`Failed to update formation: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const formation = await this.findOne(id);
        await this.formationsRepository.remove(formation);
    }
    async findByUser(userId) {
        return this.formationsRepository.find({
            where: { userId },
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
                user: true,
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
    async getParticipantsByFormationId(formationId) {
        try {
            const formation = await this.formationsRepository.findOne({
                where: { id: formationId },
                relations: ['participants'],
            });
            if (!formation) {
                throw new common_1.NotFoundException(`Formation with ID ${formationId} not found`);
            }
            return formation.participants || [];
        }
        catch (error) {
            throw new common_1.NotFoundException(`Failed to fetch participants: ${error.message}`);
        }
    }
};
exports.FormationsService = FormationsService;
exports.FormationsService = FormationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __param(1, (0, typeorm_1.InjectRepository)(module_entity_1.ModuleEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(invitation_entity_1.InvitationEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(ressource_entity_1.ResourceEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], FormationsService);
//# sourceMappingURL=formations.service.js.map