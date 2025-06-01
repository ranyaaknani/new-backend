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
exports.CertificatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const certificate_entity_1 = require("./entities/certificate.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const formation_entity_1 = require("../formation/entities/formation.entity");
let CertificatService = class CertificatService {
    certificatRepository;
    userRepository;
    formationRepository;
    constructor(certificatRepository, userRepository, formationRepository) {
        this.certificatRepository = certificatRepository;
        this.userRepository = userRepository;
        this.formationRepository = formationRepository;
    }
    async create(createCertificateDto) {
        const user = await this.userRepository.findOne({
            where: { id: createCertificateDto.participantId },
            relations: ['formations'],
        });
        if (!user) {
            throw new common_1.NotFoundException('Participant not found');
        }
        const userHasFormation = user.formations?.some((formation) => formation.id === createCertificateDto.formationId);
        if (!userHasFormation) {
            throw new common_1.BadRequestException('User is not enrolled in this formation');
        }
        const formation = await this.formationRepository.findOne({
            where: { id: createCertificateDto.formationId },
        });
        if (!formation) {
            throw new common_1.NotFoundException('Formation not found');
        }
        const certificat = this.certificatRepository.create({
            nomParticipant: createCertificateDto.nomParticipant,
            formation: createCertificateDto.formation,
            formationId: createCertificateDto.formationId,
            dateObtention: new Date(),
            urlPdf: `certificates/${createCertificateDto.participantId}-${createCertificateDto.formationId}.pdf`,
            participants: [user],
            formationEntity: formation,
        });
        const savedCertificat = await this.certificatRepository.save(certificat);
        user.hasCertificate = true;
        await this.userRepository.save(user);
        return savedCertificat;
    }
    async findAll() {
        return this.certificatRepository.find({
            relations: ['participants', 'formationEntity'],
        });
    }
    async findOne(id) {
        const certificat = await this.certificatRepository.findOne({
            where: { id },
            relations: ['participants', 'formationEntity'],
        });
        if (!certificat) {
            throw new common_1.NotFoundException('Certificate not found');
        }
        return certificat;
    }
    async findByParticipant(participantId) {
        return this.certificatRepository
            .createQueryBuilder('certificat')
            .leftJoinAndSelect('certificat.participants', 'user')
            .leftJoinAndSelect('certificat.formationEntity', 'formation')
            .where('user.id = :participantId', { participantId })
            .andWhere('user.role = :role', { role: 'participant' })
            .getMany();
    }
    async update(id, updateCertificateDto) {
        const certificat = await this.findOne(id);
        if (updateCertificateDto.formationId) {
            const formation = await this.formationRepository.findOne({
                where: { id: updateCertificateDto.formationId },
            });
            if (!formation) {
                throw new common_1.NotFoundException('Formation not found');
            }
        }
        Object.assign(certificat, updateCertificateDto);
        return this.certificatRepository.save(certificat);
    }
    async remove(id) {
        const certificat = await this.findOne(id);
        await this.certificatRepository.remove(certificat);
    }
};
exports.CertificatService = CertificatService;
exports.CertificatService = CertificatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(certificate_entity_1.Certificat)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CertificatService);
//# sourceMappingURL=certificat.service.js.map