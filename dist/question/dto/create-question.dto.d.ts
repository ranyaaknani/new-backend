import { QuestionType } from 'question/questions.entity';
export declare class CreateQuestionDto {
    type: QuestionType;
    question: string;
    options?: string[];
    correctAnswer: string;
    points: number;
    explanation?: string;
    order?: number;
    formationId: string;
}
