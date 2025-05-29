import { Formation } from './formation.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
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
    createdAt: Date;
    updatedAt: Date;
}
