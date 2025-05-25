import { Formation } from './formation.entity';
export declare class ModuleEntity {
    id: string;
    titre: string;
    resources: {
        type: string;
        url?: string;
        content?: string;
    }[];
    questions: any[];
    formation: Formation;
    formationId: string;
}
