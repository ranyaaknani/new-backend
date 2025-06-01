import { Formation } from 'formation/entities/formation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
export declare class Quiz {
    id: string;
    description?: string;
    isActive: boolean;
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
    quiz: Quiz;
    createdAt: Date;
    updatedAt: Date;
}
