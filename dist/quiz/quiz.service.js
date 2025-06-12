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
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quiz_entity_1 = require("./entities/quiz.entity");
const formation_entity_1 = require("../formation/entities/formation.entity");
const module_entity_1 = require("../modules/entities/module.entity");
let QuizService = class QuizService {
    quizRepository;
    questionRepository;
    formationRepository;
    moduleRepository;
    dataSource;
    constructor(quizRepository, questionRepository, formationRepository, moduleRepository, dataSource) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.formationRepository = formationRepository;
        this.moduleRepository = moduleRepository;
        this.dataSource = dataSource;
    }
    async create(createQuizDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const formation = await this.formationRepository.findOne({
                where: { id: createQuizDto.formationId },
            });
            if (!formation) {
                throw new common_1.NotFoundException(`Formation with ID ${createQuizDto.formationId} not found`);
            }
            const module = await this.moduleRepository.findOne({
                where: {
                    id: createQuizDto.moduleId,
                    formationId: createQuizDto.formationId,
                },
            });
            if (!module) {
                throw new common_1.NotFoundException(`Module with ID ${createQuizDto.moduleId} not found in formation ${createQuizDto.formationId}`);
            }
            const quiz = this.quizRepository.create({
                description: createQuizDto.description,
                moduleId: createQuizDto.moduleId,
                formationId: createQuizDto.formationId,
                isActive: createQuizDto.isActive !== false,
            });
            const savedQuiz = await queryRunner.manager.save(quiz);
            if (createQuizDto.questions && createQuizDto.questions.length > 0) {
                const questions = createQuizDto.questions.map((questionDto, index) => {
                    return this.questionRepository.create({
                        question: questionDto.question,
                        options: questionDto.options,
                        correctAnswer: questionDto.correctAnswer,
                        order: questionDto.order ?? index,
                        quizId: savedQuiz.id,
                    });
                });
                await queryRunner.manager.save(quiz_entity_1.QuizQuestion, questions);
            }
            await queryRunner.commitTransaction();
            return this.findOne(savedQuiz.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.ConflictException(`Failed to create quiz: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(queryDto = {}) {
        const { moduleId, formationId, search, isActive, page = 1, limit = 10, } = queryDto;
        const queryBuilder = this.quizRepository
            .createQueryBuilder('quiz')
            .leftJoinAndSelect('quiz.questions', 'questions')
            .leftJoinAndSelect('quiz.module', 'module')
            .leftJoinAndSelect('quiz.formation', 'formation')
            .orderBy('quiz.createdAt', 'DESC')
            .addOrderBy('questions.order', 'ASC');
        if (moduleId) {
            queryBuilder.andWhere('quiz.moduleId = :moduleId', { moduleId });
        }
        if (formationId) {
            queryBuilder.andWhere('quiz.formationId = :formationId', { formationId });
        }
        if (search) {
            queryBuilder.andWhere('(quiz.title ILIKE :search OR quiz.description ILIKE :search)', { search: `%${search}%` });
        }
        if (isActive !== undefined) {
            queryBuilder.andWhere('quiz.isActive = :isActive', { isActive });
        }
        const total = await queryBuilder.getCount();
        const data = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async findOne(id) {
        const quiz = await this.quizRepository.findOne({
            where: { id },
            relations: ['questions', 'module', 'formation'],
            order: {
                questions: {
                    order: 'ASC',
                },
            },
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found`);
        }
        return quiz;
    }
    async findByModule(moduleId) {
        return this.quizRepository.find({
            where: { moduleId, isActive: true },
            relations: ['questions'],
            order: {
                createdAt: 'ASC',
                questions: {
                    order: 'ASC',
                },
            },
        });
    }
    async findQuizzesByFormation(formationId) {
        try {
            const quizzes = await this.quizRepository.find({
                where: {
                    formationId,
                    isActive: true,
                },
                relations: {
                    module: true,
                    questions: true,
                },
                order: {
                    createdAt: 'DESC',
                    questions: {
                        order: 'ASC',
                    },
                },
            });
            return quizzes;
        }
        catch (error) {
            throw new Error(`Failed to fetch quizzes for formation ${formationId}: ${error.message}`);
        }
    }
    async update(id, updateQuizDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const quiz = await this.findOne(id);
            if (updateQuizDto.description !== undefined) {
                quiz.description = updateQuizDto.description;
            }
            if (updateQuizDto.isActive !== undefined) {
                quiz.isActive = updateQuizDto.isActive;
            }
            await queryRunner.manager.save(quiz);
            if (updateQuizDto.questions) {
                await queryRunner.manager.delete(quiz_entity_1.QuizQuestion, { quizId: id });
                if (updateQuizDto.questions.length > 0) {
                    const questions = updateQuizDto.questions.map((questionDto, index) => {
                        return this.questionRepository.create({
                            question: questionDto.question,
                            options: questionDto.options,
                            correctAnswer: questionDto.correctAnswer,
                            order: questionDto.order ?? index,
                            quizId: id,
                        });
                    });
                    await queryRunner.manager.save(quiz_entity_1.QuizQuestion, questions);
                }
            }
            await queryRunner.commitTransaction();
            return this.findOne(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.ConflictException(`Failed to update quiz: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const quiz = await this.findOne(id);
        await this.quizRepository.remove(quiz);
    }
    async toggleActive(id) {
        const quiz = await this.findOne(id);
        quiz.isActive = !quiz.isActive;
        await this.quizRepository.save(quiz);
        return quiz;
    }
    async addQuestion(quizId, questionData) {
        const quiz = await this.findOne(quizId);
        const question = this.questionRepository.create({
            question: questionData.question,
            options: questionData.options,
            correctAnswer: questionData.correctAnswer,
            order: questionData.order ?? quiz.questions.length,
            quizId: quizId,
        });
        await this.questionRepository.save(question);
        return this.findOne(quizId);
    }
    async removeQuestion(quizId, questionId) {
        await this.findOne(quizId);
        const question = await this.questionRepository.findOne({
            where: { id: questionId, quizId },
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question with ID ${questionId} not found in quiz ${quizId}`);
        }
        await this.questionRepository.remove(question);
        return this.findOne(quizId);
    }
    async updateQuestion(quizId, questionId, questionData) {
        await this.findOne(quizId);
        const question = await this.questionRepository.findOne({
            where: { id: questionId, quizId },
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question with ID ${questionId} not found in quiz ${quizId}`);
        }
        Object.assign(question, questionData);
        await this.questionRepository.save(question);
        return this.findOne(quizId);
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(1, (0, typeorm_1.InjectRepository)(quiz_entity_1.QuizQuestion)),
    __param(2, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __param(3, (0, typeorm_1.InjectRepository)(module_entity_1.ModuleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], QuizService);
//# sourceMappingURL=quiz.service.js.map