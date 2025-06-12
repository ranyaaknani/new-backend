import { DataSource, Repository } from 'typeorm';
import { Quiz, QuizQuestion } from './entities/quiz.entity';
import { Formation } from 'formation/entities/formation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import { CreateQuizDto, QuizQueryDto, UpdateQuizDto } from './dto/create-quiz.dto';
export declare class QuizService {
    private quizRepository;
    private questionRepository;
    private formationRepository;
    private moduleRepository;
    private dataSource;
    constructor(quizRepository: Repository<Quiz>, questionRepository: Repository<QuizQuestion>, formationRepository: Repository<Formation>, moduleRepository: Repository<ModuleEntity>, dataSource: DataSource);
    create(createQuizDto: CreateQuizDto): Promise<Quiz>;
    findAll(queryDto?: QuizQueryDto): Promise<{
        data: Quiz[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Quiz>;
    findByModule(moduleId: string): Promise<Quiz[]>;
    findQuizzesByFormation(formationId: string): Promise<Quiz[]>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz>;
    remove(id: string): Promise<void>;
    toggleActive(id: string): Promise<Quiz>;
    addQuestion(quizId: string, questionData: any): Promise<Quiz>;
    removeQuestion(quizId: string, questionId: string): Promise<Quiz>;
    updateQuestion(quizId: string, questionId: string, questionData: any): Promise<Quiz>;
}
