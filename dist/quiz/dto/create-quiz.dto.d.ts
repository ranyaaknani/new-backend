export declare class CreateQuizQuestionDto {
    question: string;
    options: string[];
    correctAnswer: number;
    order?: number;
}
export declare class UpdateQuizQuestionDto {
    question?: string;
    options?: string[];
    correctAnswer?: number;
    order?: number;
}
export declare class CreateQuizDto {
    description?: string;
    moduleId: string;
    formationId: string;
    isActive?: boolean;
    questions?: CreateQuizQuestionDto[];
}
export declare class UpdateQuizDto {
    title?: string;
    description?: string;
    isActive?: boolean;
    questions?: UpdateQuizQuestionDto[];
}
export declare class QuizQueryDto {
    moduleId?: string;
    formationId?: string;
    search?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
}
