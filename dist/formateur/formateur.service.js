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
const formateur_entity_1 = require("./formateur.entity");
const bcrypt = require("bcrypt");
let FormateurService = class FormateurService {
    formateurRepository;
    constructor(formateurRepository) {
        this.formateurRepository = formateurRepository;
    }
    async createFormateur(createFormateurDto) {
        const existingFormateur = await this.formateurRepository.findOne({
            where: { email: createFormateurDto.email },
        });
        if (existingFormateur) {
            throw new common_1.ConflictException('Un formateur avec cet email existe déjà');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createFormateurDto.password, salt);
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
    async updateFormateur(id, updateFormateurDto) {
        const formateur = await this.formateurRepository.findOne({ where: { id } });
        if (!formateur) {
            throw new common_1.NotFoundException('Formateur non trouvé');
        }
        if (updateFormateurDto.email &&
            updateFormateurDto.email !== formateur.email) {
            const existingFormateur = await this.formateurRepository.findOne({
                where: { email: updateFormateurDto.email },
            });
            if (existingFormateur) {
                throw new common_1.ConflictException('Un formateur avec cet email existe déjà');
            }
        }
        await this.formateurRepository.update(id, updateFormateurDto);
        const updatedFormateur = await this.formateurRepository.findOne({
            where: { id },
            relations: ['formations'],
            select: ['id', 'nom', 'email', 'createdAt', 'updatedAt'],
        });
        if (!updatedFormateur) {
            throw new common_1.NotFoundException('Formateur non trouvé après mise à jour');
        }
        return updatedFormateur;
    }
    async deleteFormateur(id) {
        const formateur = await this.formateurRepository.findOne({
            where: { id },
            relations: ['formations'],
        });
        if (!formateur) {
            throw new common_1.NotFoundException('Formateur non trouvé');
        }
        await this.formateurRepository.delete(id);
        return { message: 'Formateur deleted successfully' };
    }
    async getFormateurById(id) {
        const formateur = await this.formateurRepository.findOne({
            where: { id },
            relations: ['formations'],
            select: ['id', 'nom', 'email', 'createdAt', 'updatedAt'],
        });
        if (!formateur) {
            throw new common_1.NotFoundException('Formateur non trouvé');
        }
        return formateur;
    }
};
exports.FormateurService = FormateurService;
exports.FormateurService = FormateurService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(formateur_entity_1.Formateur)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FormateurService);
//# sourceMappingURL=formateur.service.js.map