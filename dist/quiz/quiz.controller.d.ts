import { QuizService } from './quiz.service';
import { CreateQuizDto, QuizQueryDto, UpdateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from './entities/quiz.entity';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    create(createQuizDto: CreateQuizDto): Promise<{
        success: boolean;
        message: string;
        data: Quiz;
    }>;
    findAll(queryDto: QuizQueryDto): Promise<{
        success: boolean;
        message: string;
        data: Quiz[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findByModule(moduleId: string): Promise<{
        success: boolean;
        message: string;
        data: Quiz[];
    }>;
    getQuizzesByFormation(formationId: string): Promise<{
        success: boolean;
        message: string;
        data: Quiz[];
        count: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: Quiz;
    }>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<{
        success: boolean;
        message: string;
        data: Quiz;
    }>;
    toggleActive(id: string): Promise<{
        success: boolean;
        message: string;
        data: Quiz;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    addQuestion(id: string, questionData: any): Promise<{
        success: boolean;
        message: string;
        data: Quiz;
    }>;
    removeQuestion(id: string, questionId: string): Promise<{
        success: boolean;
        message: string;
        data: Quiz;
    }>;
    updateQuestion(id: string, questionId: string, questionData: any): Promise<{
        success: boolean;
        message: string;
        data: Quiz;
    }>;
}
