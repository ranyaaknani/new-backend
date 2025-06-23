import { EvaluationTestService } from './evaluation-test.service';
import { CreateEvaluationTestDto } from './dto/create-ecaluationTest.dto';
import { UpdateEvaluationTestDto } from './dto/update-ecaluationTest.dto';
export declare class EvaluationTestController {
    private readonly evaluationTestService;
    constructor(evaluationTestService: EvaluationTestService);
    create(createEvaluationTestDto: CreateEvaluationTestDto): Promise<import("./evaluation_test.entity").EvaluationTest>;
    findAll(): Promise<import("./evaluation_test.entity").EvaluationTest[]>;
    findEnabledTests(): Promise<import("./evaluation_test.entity").EvaluationTest[]>;
    findOne(id: string): Promise<import("./evaluation_test.entity").EvaluationTest>;
    update(id: string, updateEvaluationTestDto: UpdateEvaluationTestDto): Promise<import("./evaluation_test.entity").EvaluationTest>;
    remove(id: string): Promise<void>;
}
