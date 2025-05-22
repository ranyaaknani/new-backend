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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFormationDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class QCMOptionDto {
    texte;
    justification;
    isCorrect;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QCMOptionDto.prototype, "texte", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QCMOptionDto.prototype, "justification", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], QCMOptionDto.prototype, "isCorrect", void 0);
class QuestionDto {
    question;
    options;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QCMOptionDto),
    __metadata("design:type", Array)
], QuestionDto.prototype, "options", void 0);
class ResourceDto {
    type;
    url;
    content;
    columns;
    rows;
}
__decorate([
    (0, class_validator_1.IsEnum)(['video', 'pdf', 'word', 'paragraph', 'table']),
    __metadata("design:type", String)
], ResourceDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResourceDto.prototype, "columns", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResourceDto.prototype, "rows", void 0);
class ModuleDto {
    titre;
    questions;
    resources;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModuleDto.prototype, "titre", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuestionDto),
    __metadata("design:type", Array)
], ModuleDto.prototype, "questions", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ResourceDto),
    __metadata("design:type", Array)
], ModuleDto.prototype, "resources", void 0);
class InvitationDto {
    mode;
    emails;
    linkGenerated;
    csvFile;
}
__decorate([
    (0, class_validator_1.IsEnum)(['email', 'link', 'csv']),
    __metadata("design:type", String)
], InvitationDto.prototype, "mode", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], InvitationDto.prototype, "emails", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InvitationDto.prototype, "linkGenerated", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], InvitationDto.prototype, "csvFile", void 0);
class CreateFormationDto {
    titre;
    image;
    domaine;
    description;
    objectifs;
    modules;
    accessType;
    invitation;
}
exports.CreateFormationDto = CreateFormationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormationDto.prototype, "titre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormationDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormationDto.prototype, "domaine", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormationDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormationDto.prototype, "objectifs", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ModuleDto),
    __metadata("design:type", Array)
], CreateFormationDto.prototype, "modules", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['private', 'public']),
    __metadata("design:type", String)
], CreateFormationDto.prototype, "accessType", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => InvitationDto),
    __metadata("design:type", InvitationDto)
], CreateFormationDto.prototype, "invitation", void 0);
//# sourceMappingURL=create-formation.dto.js.map