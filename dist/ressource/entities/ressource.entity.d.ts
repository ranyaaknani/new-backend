import { ModuleEntity } from 'modules/entities/module.entity';
export declare class ResourceEntity {
    id: string;
    title: string;
    type: string;
    url?: string;
    content?: string;
    duration?: number;
    order: number;
    isSaved: boolean;
    isCompleted: boolean;
    thumbnail?: string;
    description?: string;
    tableData?: {
        headers: string[];
        data: string[][];
    };
    fileName?: string;
    fileSize?: number;
    previewUrl?: string;
    moduleId: string;
    module: ModuleEntity;
    createdAt: Date;
    updatedAt: Date;
}
