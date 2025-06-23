import { EvaluationTest } from 'evaluation_test/evaluation_test.entity';
import { Formation } from 'formation/entities/formation.entity';
export declare enum QuestionType {
    MULTIPLE_CHOICE = "multiple-choice",
    TRUE_FALSE = "true-false",
    SHORT_ANSWER = "short-answer"
}
export declare class Question {
    id: string;
    type: QuestionType;
    question: string;
    options: string[] | null;
    correctAnswer: string;
    points: number;
    explanation: string | null;
    order: number;
    formationId: string;
    formation: Formation;
    createdAt: Date;
    updatedAt: Date;
    evaluationTestId: string;
    evaluationTest: EvaluationTest;
}
