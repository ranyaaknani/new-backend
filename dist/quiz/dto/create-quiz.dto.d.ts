export declare class CreateQuizQuestionDto {
    question: string;
    options: string[];
    correctAnswer: number;
    order?: number;
    score?: number;
}
export declare class UpdateQuizQuestionDto {
    question?: string;
    options?: string[];
    correctAnswer?: number;
    order?: number;
    score?: number;
}
export declare class CreateQuizDto {
    description?: string;
    moduleId: string;
    formationId: string;
    score?: number;
    isActive?: boolean;
    questions?: CreateQuizQuestionDto[];
}
export declare class UpdateQuizDto {
    title?: string;
    description?: string;
    isActive?: boolean;
    score?: number;
    questions?: UpdateQuizQuestionDto[];
}
export declare class QuizQueryDto {
    moduleId?: string;
    formationId?: string;
    search?: string;
    isActive?: boolean;
    page?: number;
    score?: number;
    limit?: number;
}
