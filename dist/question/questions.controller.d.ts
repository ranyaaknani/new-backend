import { QuestionsService } from './questions.service';
import { QuestionAdminResponseDto, QuestionResponseDto } from './dto/question-response.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(createQuestionDto: CreateQuestionDto): Promise<QuestionAdminResponseDto>;
    bulkCreate(createQuestionsDto: CreateQuestionDto[]): Promise<QuestionAdminResponseDto[]>;
    findAll(): Promise<QuestionAdminResponseDto[]>;
    findByFormation(formationId: string, includeAnswers: string): Promise<QuestionResponseDto[] | QuestionAdminResponseDto[]>;
    findOne(id: string): Promise<QuestionResponseDto>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<QuestionAdminResponseDto>;
    remove(id: string): Promise<void>;
    reorderQuestions(formationId: string, body: {
        questionIds: string[];
    }): Promise<QuestionAdminResponseDto[]>;
}
