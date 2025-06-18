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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const questions_entity_1 = require("./questions.entity");
const typeorm_2 = require("typeorm");
const formation_entity_1 = require("../formation/entities/formation.entity");
let QuestionsService = class QuestionsService {
    questionRepository;
    formationRepository;
    constructor(questionRepository, formationRepository) {
        this.questionRepository = questionRepository;
        this.formationRepository = formationRepository;
    }
    async create(createQuestionDto) {
        const formation = await this.formationRepository.findOne({
            where: { id: createQuestionDto.formationId },
        });
        if (!formation) {
            throw new common_1.NotFoundException('Formation not found');
        }
        this.validateQuestionData(createQuestionDto);
        if (createQuestionDto.order === undefined) {
            const questionCount = await this.questionRepository.count({
                where: { formationId: createQuestionDto.formationId },
            });
            createQuestionDto.order = questionCount;
        }
        const question = this.questionRepository.create(createQuestionDto);
        return await this.questionRepository.save(question);
    }
    async findAll() {
        return await this.questionRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findByFormation(formationId) {
        const formation = await this.formationRepository.findOne({
            where: { id: formationId },
        });
        if (!formation) {
            throw new common_1.NotFoundException('Formation not found');
        }
        return await this.questionRepository.find({
            where: { formationId },
            order: { order: 'ASC', createdAt: 'ASC' },
        });
    }
    async findByFormationWithAnswers(formationId) {
        const formation = await this.formationRepository.findOne({
            where: { id: formationId },
        });
        if (!formation) {
            throw new common_1.NotFoundException('Formation not found');
        }
        return await this.questionRepository.find({
            where: { formationId },
            order: { order: 'ASC', createdAt: 'ASC' },
        });
    }
    async findOne(id) {
        const question = await this.questionRepository.findOne({
            where: { id },
            relations: ['formation'],
        });
        if (!question) {
            throw new common_1.NotFoundException('Question not found');
        }
        return question;
    }
    async update(id, updateQuestionDto) {
        const question = await this.questionRepository.findOne({
            where: { id },
            relations: ['formation'],
        });
        if (!question) {
            throw new common_1.NotFoundException('Question not found');
        }
        const mergedData = {
            type: updateQuestionDto.type ?? question.type,
            question: updateQuestionDto.question ?? question.question,
            options: updateQuestionDto.options ?? question.options ?? undefined,
            correctAnswer: updateQuestionDto.correctAnswer ?? question.correctAnswer,
            points: updateQuestionDto.points ?? question.points,
            explanation: updateQuestionDto.explanation ?? question.explanation ?? undefined,
            order: updateQuestionDto.order ?? question.order,
            formationId: question.formationId,
        };
        this.validateQuestionData(mergedData);
        Object.assign(question, updateQuestionDto);
        return await this.questionRepository.save(question);
    }
    async remove(id) {
        const question = await this.questionRepository.findOne({
            where: { id },
            relations: ['formation'],
        });
        if (!question) {
            throw new common_1.NotFoundException('Question not found');
        }
        await this.questionRepository.remove(question);
    }
    async reorderQuestions(formationId, questionIds) {
        const formation = await this.formationRepository.findOne({
            where: { id: formationId },
        });
        if (!formation) {
            throw new common_1.NotFoundException('Formation not found');
        }
        const updatePromises = questionIds.map((questionId, index) => this.questionRepository.update({ id: questionId, formationId }, { order: index }));
        await Promise.all(updatePromises);
        return await this.findByFormation(formationId);
    }
    async bulkCreate(questions) {
        if (questions.length === 0) {
            return [];
        }
        const formationId = questions[0].formationId;
        if (!questions.every((q) => q.formationId === formationId)) {
            throw new common_1.BadRequestException('All questions must belong to the same formation');
        }
        const formation = await this.formationRepository.findOne({
            where: { id: formationId },
        });
        if (!formation) {
            throw new common_1.NotFoundException('Formation not found');
        }
        questions.forEach((questionDto) => this.validateQuestionData(questionDto));
        const currentCount = await this.questionRepository.count({
            where: { formationId },
        });
        questions.forEach((questionDto, index) => {
            if (questionDto.order === undefined) {
                questionDto.order = currentCount + index;
            }
        });
        const createdQuestions = this.questionRepository.create(questions);
        return await this.questionRepository.save(createdQuestions);
    }
    validateQuestionData(questionData) {
        if (questionData.type === questions_entity_1.QuestionType.MULTIPLE_CHOICE) {
            if (!questionData.options || questionData.options.length < 2) {
                throw new common_1.BadRequestException('Multiple choice questions must have at least 2 options');
            }
            const correctAnswerIndex = parseInt(questionData.correctAnswer, 10);
            if (isNaN(correctAnswerIndex) ||
                correctAnswerIndex < 0 ||
                correctAnswerIndex >= questionData.options.length) {
                throw new common_1.BadRequestException('Correct answer must be a valid option index for multiple choice questions');
            }
        }
        if (questionData.type === questions_entity_1.QuestionType.TRUE_FALSE) {
            if (!['true', 'false'].includes(questionData.correctAnswer)) {
                throw new common_1.BadRequestException('True/False questions must have "true" or "false" as correct answer');
            }
        }
        if (questionData.type === questions_entity_1.QuestionType.SHORT_ANSWER) {
            if (!questionData.correctAnswer ||
                questionData.correctAnswer.trim().length === 0) {
                throw new common_1.BadRequestException('Short answer questions must have a correct answer');
            }
        }
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(questions_entity_1.Question)),
    __param(1, (0, typeorm_1.InjectRepository)(formation_entity_1.Formation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map