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
exports.InvitationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const invitation_entity_1 = require("./invitation.entity");
const typeorm_2 = require("typeorm");
const formation_entity_1 = require("../formation/entities/formation.entity");
let InvitationsService = class InvitationsService {
    invitationsRepository;
    formationsRepository;
    dataSource;
    constructor(invitationsRepository, formationsRepository, dataSource) {
        this.invitationsRepository = invitationsRepository;
        this.formationsRepository = formationsRepository;
        this.dataSource = dataSource;
    }
    async create(createInvitationDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const formation = await this.formationsRepository.findOne({
                where: { id: createInvitationDto.formationId },
            });
            if (!formation) {
                throw new common_1.NotFoundException(`Formation with ID ${createInvitationDto.formationId} not found`);
            }
            const invitation = this.invitationsRepository.create({
                mode: createInvitationDto.mode,
                emails: createInvitationDto.emails,
                fromEmails: createInvitationDto.fromEmails,
                toEmails: createInvitationDto.toEmails,
                invitationLink: createInvitationDto.invitationLink,
                linkGenerated: createInvitationDto.linkGenerated || false,
                csvFile: createInvitationDto.csvFile,
                csvImage: createInvitationDto.csvImage,
                subject: createInvitationDto.subject,
                message: createInvitationDto.message,
                expiresAt: createInvitationDto.expiresAt
                    ? new Date(createInvitationDto.expiresAt)
                    : undefined,
                isActive: createInvitationDto.isActive !== false,
                formationId: createInvitationDto.formationId,
            });
            const savedInvitation = await queryRunner.manager.save(invitation);
            await queryRunner.commitTransaction();
            return this.findOne(savedInvitation.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.ConflictException(`Failed to create invitation: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return this.invitationsRepository.find({
            relations: { formation: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const invitation = await this.invitationsRepository.findOne({
            where: { id },
            relations: { formation: true },
        });
        if (!invitation) {
            throw new common_1.NotFoundException(`Invitation with ID ${id} not found`);
        }
        return invitation;
    }
    async remove(id) {
        const invitation = await this.findOne(id);
        await this.invitationsRepository.remove(invitation);
    }
};
exports.InvitationsService = InvitationsService;
exports.InvitationsService = InvitationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invitation_entity_1.InvitationEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], InvitationsService);
//# sourceMappingURL=invitation.service.js.map