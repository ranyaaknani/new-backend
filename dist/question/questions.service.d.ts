import { Question } from './questions.entity';
import { Repository } from 'typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionsService {
    private readonly questionRepository;
    private readonly formationRepository;
    constructor(questionRepository: Repository<Question>, formationRepository: Repository<Formation>);
    create(createQuestionDto: CreateQuestionDto): Promise<Question>;
    findAll(): Promise<Question[]>;
    findByFormation(formationId: string): Promise<Question[]>;
    findByFormationWithAnswers(formationId: string): Promise<Question[]>;
    findOne(id: string): Promise<Question>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
    remove(id: string): Promise<void>;
    reorderQuestions(formationId: string, questionIds: string[]): Promise<Question[]>;
    bulkCreate(questions: CreateQuestionDto[]): Promise<Question[]>;
    private validateQuestionData;
}
