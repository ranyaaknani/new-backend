import { Repository } from 'typeorm';
import { EvaluationTest } from './evaluation_test.entity';
import { Question } from 'question/questions.entity';
import { CreateEvaluationTestDto } from './dto/create-ecaluationTest.dto';
import { UpdateEvaluationTestDto } from './dto/update-ecaluationTest.dto';
export declare class EvaluationTestService {
    private evaluationTestRepository;
    private questionRepository;
    constructor(evaluationTestRepository: Repository<EvaluationTest>, questionRepository: Repository<Question>);
    create(createEvaluationTestDto: CreateEvaluationTestDto): Promise<EvaluationTest>;
    findAll(): Promise<EvaluationTest[]>;
    findOne(id: string): Promise<EvaluationTest>;
    update(id: string, updateEvaluationTestDto: UpdateEvaluationTestDto): Promise<EvaluationTest>;
    remove(id: string): Promise<void>;
    findEnabledTests(): Promise<EvaluationTest[]>;
}
