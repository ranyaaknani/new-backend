import { Formation } from 'formation/entities/formation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
export declare class Quiz {
    id: string;
    description?: string;
    isActive: boolean;
    score: number;
    moduleId: string;
    formationId: string;
    module: ModuleEntity;
    formation: Formation;
    questions: QuizQuestion[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    order: number;
    quizId: string;
    score: number;
    quiz: Quiz;
    createdAt: Date;
    updatedAt: Date;
}
