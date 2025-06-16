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
exports.ParticipantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const participant_entity_1 = require("./entities/participant.entity");
const formation_entity_1 = require("../formation/entities/formation.entity");
let ParticipantsService = class ParticipantsService {
    participantRepository;
    formationRepository;
    constructor(participantRepository, formationRepository) {
        this.participantRepository = participantRepository;
        this.formationRepository = formationRepository;
    }
    async create(createParticipantDto) {
        const formation = await this.formationRepository.findOne({
            where: { id: createParticipantDto.formationId },
            relations: ['formateur'],
        });
        if (!formation) {
            throw new common_1.NotFoundException(`Formation with ID ${createParticipantDto.formationId} not found`);
        }
        const participant = this.participantRepository.create({
            ...createParticipantDto,
            formation,
        });
        return this.participantRepository.save(participant);
    }
    async findAll() {
        return this.participantRepository.find({
            relations: ['formation', 'formation.formateur'],
            order: { dateInscription: 'DESC' },
        });
    }
    async findByFormateur(formateurId) {
        return this.participantRepository.find({
            where: {
                formation: {
                    userId: formateurId,
                },
            },
            relations: ['formation', 'formation.formateur'],
            order: { dateInscription: 'DESC' },
        });
    }
    async findByFormation(formationId) {
        return this.participantRepository.find({
            where: { formationId },
            relations: ['formation', 'formation.formateur'],
            order: { dateInscription: 'DESC' },
        });
    }
    async findOne(id) {
        const participant = await this.participantRepository.findOne({
            where: { id },
            relations: ['formation', 'formation.formateur'],
        });
        if (!participant) {
            throw new common_1.NotFoundException(`Participant with ID ${id} not found`);
        }
        return participant;
    }
    async update(id, updateParticipantDto) {
        const participant = await this.findOne(id);
        Object.assign(participant, updateParticipantDto);
        return this.participantRepository.save(participant);
    }
    async updateStatus(id, status) {
        const participant = await this.findOne(id);
        participant.statusFormation = status;
        return this.participantRepository.save(participant);
    }
    async toggleActive(id) {
        const participant = await this.findOne(id);
        participant.isActive = !participant.isActive;
        return this.participantRepository.save(participant);
    }
    async generateCertificate(id) {
        const participant = await this.findOne(id);
        if (participant.score < 70) {
            throw new common_1.BadRequestException('Score minimum de 70% requis pour obtenir le certificat');
        }
        participant.certificatObtenu = true;
        participant.statusFormation = 'Terminé';
        return this.participantRepository.save(participant);
    }
    async sendEmailReminder(id) {
        const participant = await this.findOne(id);
        console.log(`Sending email reminder to: ${participant.email}`);
        return { message: `Rappel envoyé à ${participant.email}` };
    }
    async remove(id) {
        const participant = await this.findOne(id);
        await this.participantRepository.remove(participant);
    }
    async getStatistics() {
        const total = await this.participantRepository.count();
        const actifs = await this.participantRepository.count({
            where: { isActive: true },
        });
        const certificats = await this.participantRepository.count({
            where: { certificatObtenu: true },
        });
        const enCours = await this.participantRepository.count({
            where: { statusFormation: 'En cours' },
        });
        return {
            total,
            actifs,
            inactifs: total - actifs,
            certificats,
            enCours,
            termines: await this.participantRepository.count({
                where: { statusFormation: 'Terminé' },
            }),
        };
    }
};
exports.ParticipantsService = ParticipantsService;
exports.ParticipantsService = ParticipantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(participant_entity_1.Participant)),
    __param(1, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ParticipantsService);
//# sourceMappingURL=participant.service.js.map