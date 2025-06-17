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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const formation_entity_1 = require("../formation/entities/formation.entity");
let UsersService = class UsersService {
    userRepository;
    formationsRepository;
    dataSource;
    constructor(userRepository, formationsRepository, dataSource) {
        this.userRepository = userRepository;
        this.formationsRepository = formationsRepository;
        this.dataSource = dataSource;
    }
    async findAll(role) {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.formations', 'formations');
        if (role) {
            queryBuilder.where('user.role = :role', { role });
        }
        return queryBuilder.getMany();
    }
    async update(id, updateData) {
        const user = await this.findOneById(id);
        Object.assign(user, updateData);
        return this.userRepository.save(user);
    }
    async remove(user) {
        await this.userRepository.remove(user);
        return { deleted: true };
    }
    async create(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
    async findOneById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Utilisateur avec l'id ${id} introuvable`);
        }
        return user;
    }
    async findOneByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async createUserWithFormation(createUserDto) {
        try {
            const { formationId, ...userData } = createUserDto;
            const existingUser = await this.userRepository.findOne({
                where: { email: userData.email },
            });
            if (existingUser) {
                if (formationId) {
                    const formation = await this.formationsRepository.findOne({
                        where: { id: formationId },
                        relations: ['participants'],
                    });
                    if (!formation) {
                        throw new Error('Formation non trouvée');
                    }
                    const isAlreadyParticipant = formation.participants.some((participant) => participant.id === existingUser.id);
                    if (isAlreadyParticipant) {
                        throw new Error('Cet utilisateur est déjà participant à cette formation');
                    }
                    formation.participants.push(existingUser);
                    await this.formationsRepository.save(formation);
                    return {
                        success: true,
                        message: 'Utilisateur existant ajouté avec succès à la formation',
                        user: {
                            id: existingUser.id,
                            email: existingUser.email,
                            name: existingUser.name,
                            role: existingUser.role,
                            status: existingUser.status,
                        },
                    };
                }
                else {
                    throw new Error('Un utilisateur avec cette adresse email existe déjà');
                }
            }
            const user = this.userRepository.create(userData);
            const savedUser = await this.userRepository.save(user);
            if (formationId) {
                const formation = await this.formationsRepository.findOne({
                    where: { id: formationId },
                    relations: ['participants'],
                });
                if (!formation) {
                    throw new Error('Formation non trouvée');
                }
                if (!formation.participants) {
                    formation.participants = [];
                }
                formation.participants.push(savedUser);
                await this.formationsRepository.save(formation);
            }
            return {
                success: true,
                message: formationId
                    ? 'Participant créé et ajouté avec succès à la formation'
                    : 'Utilisateur créé avec succès',
                user: {
                    id: savedUser.id,
                    email: savedUser.email,
                    name: savedUser.name,
                    role: savedUser.role,
                    status: savedUser.status,
                },
            };
        }
        catch (error) {
            throw new Error(error.message || "Erreur lors de la création de l'utilisateur");
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], UsersService);
//# sourceMappingURL=users.service.js.map