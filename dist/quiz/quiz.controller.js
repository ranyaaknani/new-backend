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
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("./quiz.service");
const create_quiz_dto_1 = require("./dto/create-quiz.dto");
let QuizController = class QuizController {
    quizService;
    constructor(quizService) {
        this.quizService = quizService;
    }
    async create(createQuizDto) {
        try {
            const quiz = await this.quizService.create(createQuizDto);
            return {
                success: true,
                message: 'Quiz created successfully',
                data: quiz,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to create quiz',
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(queryDto) {
        try {
            const result = await this.quizService.findAll(queryDto);
            return {
                success: true,
                message: 'Quizzes retrieved successfully',
                data: result.data,
                pagination: {
                    total: result.total,
                    page: result.page,
                    limit: result.limit,
                    totalPages: Math.ceil(result.total / result.limit),
                },
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to retrieve quizzes',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByModule(moduleId) {
        try {
            const quizzes = await this.quizService.findByModule(moduleId);
            return {
                success: true,
                message: 'Module quizzes retrieved successfully',
                data: quizzes,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to retrieve module quizzes',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByFormation(formationId) {
        try {
            const quizzes = await this.quizService.findByFormation(formationId);
            return {
                success: true,
                message: 'Formation quizzes retrieved successfully',
                data: quizzes,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to retrieve formation quizzes',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const quiz = await this.quizService.findOne(id);
            return {
                success: true,
                message: 'Quiz retrieved successfully',
                data: quiz,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to retrieve quiz',
                error: error.message,
            }, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateQuizDto) {
        try {
            const quiz = await this.quizService.update(id, updateQuizDto);
            return {
                success: true,
                message: 'Quiz updated successfully',
                data: quiz,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to update quiz',
                error: error.message,
            }, error.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async toggleActive(id) {
        try {
            const quiz = await this.quizService.toggleActive(id);
            return {
                success: true,
                message: `Quiz ${quiz.isActive ? 'activated' : 'deactivated'} successfully`,
                data: quiz,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to toggle quiz status',
                error: error.message,
            }, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            await this.quizService.remove(id);
            return {
                success: true,
                message: 'Quiz deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to delete quiz',
                error: error.message,
            }, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addQuestion(id, questionData) {
        try {
            const quiz = await this.quizService.addQuestion(id, questionData);
            return {
                success: true,
                message: 'Question added successfully',
                data: quiz,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to add question',
                error: error.message,
            }, error.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async removeQuestion(id, questionId) {
        try {
            const quiz = await this.quizService.removeQuestion(id, questionId);
            return {
                success: true,
                message: 'Question removed successfully',
                data: quiz,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to remove question',
                error: error.message,
            }, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateQuestion(id, questionId, questionData) {
        try {
            const quiz = await this.quizService.updateQuestion(id, questionId, questionData);
            return {
                success: true,
                message: 'Question updated successfully',
                data: quiz,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to update question',
                error: error.message,
            }, error.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quiz_dto_1.CreateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quiz_dto_1.QuizQueryDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('module/:moduleId'),
    __param(0, (0, common_1.Param)('moduleId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "findByModule", null);
__decorate([
    (0, common_1.Get)('formation/:formationId'),
    __param(0, (0, common_1.Param)('formationId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "findByFormation", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_quiz_dto_1.UpdateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-active'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/questions'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "addQuestion", null);
__decorate([
    (0, common_1.Delete)(':id/questions/:questionId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('questionId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "removeQuestion", null);
__decorate([
    (0, common_1.Patch)(':id/questions/:questionId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('questionId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "updateQuestion", null);
exports.QuizController = QuizController = __decorate([
    (0, common_1.Controller)('quizzes'),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizController);
//# sourceMappingURL=quiz.controller.js.map