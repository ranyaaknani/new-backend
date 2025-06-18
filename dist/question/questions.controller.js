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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const questions_service_1 = require("./questions.service");
const question_response_dto_1 = require("./dto/question-response.dto");
const create_question_dto_1 = require("./dto/create-question.dto");
const class_transformer_1 = require("class-transformer");
const update_question_dto_1 = require("./dto/update-question.dto");
let QuestionsController = class QuestionsController {
    questionsService;
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    async create(createQuestionDto) {
        const question = await this.questionsService.create(createQuestionDto);
        return (0, class_transformer_1.plainToClass)(question_response_dto_1.QuestionAdminResponseDto, question, {
            excludeExtraneousValues: true,
        });
    }
    async bulkCreate(createQuestionsDto) {
        const questions = await this.questionsService.bulkCreate(createQuestionsDto);
        return (0, class_transformer_1.plainToClass)(question_response_dto_1.QuestionAdminResponseDto, questions, {
            excludeExtraneousValues: true,
        });
    }
    async findAll() {
        const questions = await this.questionsService.findAll();
        return (0, class_transformer_1.plainToClass)(question_response_dto_1.QuestionAdminResponseDto, questions, {
            excludeExtraneousValues: true,
        });
    }
    async findByFormation(formationId, includeAnswers) {
        const shouldIncludeAnswers = includeAnswers === 'true';
        if (shouldIncludeAnswers) {
            const questions = await this.questionsService.findByFormationWithAnswers(formationId);
            return (0, class_transformer_1.plainToClass)(question_response_dto_1.QuestionAdminResponseDto, questions, {
                excludeExtraneousValues: true,
            });
        }
        else {
            const questions = await this.questionsService.findByFormation(formationId);
            return (0, class_transformer_1.plainToClass)(question_response_dto_1.QuestionResponseDto, questions, {
                excludeExtraneousValues: true,
            });
        }
    }
    async findOne(id) {
        const question = await this.questionsService.findOne(id);
        return (0, class_transformer_1.plainToClass)(question_response_dto_1.QuestionResponseDto, question, {
            excludeExtraneousValues: true,
        });
    }
    async update(id, updateQuestionDto) {
        const question = await this.questionsService.update(id, updateQuestionDto);
        return (0, class_transformer_1.plainToClass)(question_response_dto_1.QuestionAdminResponseDto, question, {
            excludeExtraneousValues: true,
        });
    }
    async remove(id) {
        await this.questionsService.remove(id);
    }
    async reorderQuestions(formationId, body) {
        const questions = await this.questionsService.reorderQuestions(formationId, body.questionIds);
        return (0, class_transformer_1.plainToClass)(question_response_dto_1.QuestionAdminResponseDto, questions, {
            excludeExtraneousValues: true,
        });
    }
};
exports.QuestionsController = QuestionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new question' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Question created successfully',
        type: question_response_dto_1.QuestionAdminResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Formation not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Create multiple questions at once' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Questions created successfully',
        type: [question_response_dto_1.QuestionAdminResponseDto],
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "bulkCreate", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all questions' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Questions retrieved successfully',
        type: [question_response_dto_1.QuestionAdminResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('formation/:formationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get questions by formation' }),
    (0, swagger_1.ApiParam)({ name: 'formationId', description: 'Formation ID' }),
    (0, swagger_1.ApiQuery)({
        name: 'includeAnswers',
        required: false,
        description: 'Include correct answers',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Questions retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('formationId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('includeAnswers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findByFormation", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific question' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Question retrieved successfully',
        type: question_response_dto_1.QuestionResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a question' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Question updated successfully',
        type: question_response_dto_1.QuestionAdminResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a question' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Question deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('formation/:formationId/reorder'),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder questions in a formation' }),
    (0, swagger_1.ApiParam)({ name: 'formationId', description: 'Formation ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Questions reordered successfully',
        type: [question_response_dto_1.QuestionAdminResponseDto],
    }),
    __param(0, (0, common_1.Param)('formationId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "reorderQuestions", null);
exports.QuestionsController = QuestionsController = __decorate([
    (0, swagger_1.ApiTags)('questions'),
    (0, common_1.Controller)('questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
//# sourceMappingURL=questions.controller.js.map