import { QuestionType } from 'question/questions.entity';
export declare class QuestionResponseDto {
    id: string;
    type: QuestionType;
    question: string;
    options?: string[];
    correctAnswer: string;
    points: number;
    explanation?: string;
    order: number;
    formationId: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class QuestionAdminResponseDto extends QuestionResponseDto {
    correctAnswer: string;
}
