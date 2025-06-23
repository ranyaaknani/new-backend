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
exports.EvaluationTestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const evaluation_test_entity_1 = require("./evaluation_test.entity");
const questions_entity_1 = require("../question/questions.entity");
let EvaluationTestService = class EvaluationTestService {
    evaluationTestRepository;
    questionRepository;
    constructor(evaluationTestRepository, questionRepository) {
        this.evaluationTestRepository = evaluationTestRepository;
        this.questionRepository = questionRepository;
    }
    async create(createEvaluationTestDto) {
        const evaluationTest = this.evaluationTestRepository.create({
            isEnabled: createEvaluationTestDto.isEnabled,
            title: createEvaluationTestDto.title,
            timeLimit: createEvaluationTestDto.timeLimit,
            passingScore: createEvaluationTestDto.passingScore,
            description: createEvaluationTestDto.description,
            formationId: createEvaluationTestDto.formationId,
        });
        const savedTest = await this.evaluationTestRepository.save(evaluationTest);
        if (createEvaluationTestDto.questions &&
            createEvaluationTestDto.questions.length > 0) {
            const questions = createEvaluationTestDto.questions.map((questionDto) => this.questionRepository.create({
                ...questionDto,
                evaluationTestId: savedTest.id,
            }));
            await this.questionRepository.save(questions);
        }
        return this.findOne(savedTest.id);
    }
    async findAll() {
        return this.evaluationTestRepository.find({
            relations: ['questions'],
            order: {
                createdAt: 'DESC',
                questions: {
                    order: 'ASC',
                },
            },
        });
    }
    async findOne(id) {
        const evaluationTest = await this.evaluationTestRepository.findOne({
            where: { id },
            relations: ['questions'],
            order: {
                questions: {
                    order: 'ASC',
                },
            },
        });
        if (!evaluationTest) {
            throw new common_1.NotFoundException(`Evaluation test with ID ${id} not found`);
        }
        return evaluationTest;
    }
    async update(id, updateEvaluationTestDto) {
        const evaluationTest = await this.findOne(id);
        Object.assign(evaluationTest, {
            isEnabled: updateEvaluationTestDto.isEnabled ?? evaluationTest.isEnabled,
            title: updateEvaluationTestDto.title ?? evaluationTest.title,
            timeLimit: updateEvaluationTestDto.timeLimit ?? evaluationTest.timeLimit,
            passingScore: updateEvaluationTestDto.passingScore ?? evaluationTest.passingScore,
            description: updateEvaluationTestDto.description ?? evaluationTest.description,
            formationId: updateEvaluationTestDto.formationId ?? evaluationTest.formationId,
        });
        await this.evaluationTestRepository.save(evaluationTest);
        if (updateEvaluationTestDto.questions) {
            await this.questionRepository.delete({ evaluationTestId: id });
            const questions = updateEvaluationTestDto.questions.map((questionDto) => this.questionRepository.create({
                ...questionDto,
                evaluationTestId: id,
            }));
            await this.questionRepository.save(questions);
        }
        return this.findOne(id);
    }
    async remove(id) {
        const evaluationTest = await this.findOne(id);
        await this.evaluationTestRepository.remove(evaluationTest);
    }
    async findEnabledTests() {
        return this.evaluationTestRepository.find({
            where: { isEnabled: true },
            relations: ['questions'],
            order: {
                createdAt: 'DESC',
                questions: {
                    order: 'ASC',
                },
            },
        });
    }
};
exports.EvaluationTestService = EvaluationTestService;
exports.EvaluationTestService = EvaluationTestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evaluation_test_entity_1.EvaluationTest)),
    __param(1, (0, typeorm_1.InjectRepository)(questions_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EvaluationTestService);
//# sourceMappingURL=evaluation-test.service.js.map