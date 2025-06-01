import { Formation } from '../../formation/entities/formation.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
import { Quiz } from 'quiz/entities/quiz.entity';
export declare class ModuleEntity {
    id: string;
    titre: string;
    order: number;
    description?: string;
    duration?: number;
    questions?: any[];
    formationId: string;
    formation: Formation;
    resources: ResourceEntity[];
    quizzes: Quiz[];
    createdAt: Date;
    updatedAt: Date;
}
