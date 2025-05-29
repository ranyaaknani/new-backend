import { ModuleEntity } from 'formation/entities/module.entity';
export declare class ResourceEntity {
    id: string;
    title: string;
    type: string;
    videoLink?: string;
    pdfLink?: string;
    textLink?: string;
    content?: string;
    duration?: number;
    order: number;
    isCompleted: boolean;
    thumbnail?: string;
    description?: string;
    moduleId: string;
    module: ModuleEntity;
    createdAt: Date;
    updatedAt: Date;
}
