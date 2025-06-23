import { Formation } from 'formation/entities/formation.entity';
import { Question } from 'question/questions.entity';
export declare class EvaluationTest {
    id: string;
    isEnabled: boolean;
    title: string;
    timeLimit: number;
    passingScore: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    questions: Question[];
    formationId: string;
    formation: Formation;
}
