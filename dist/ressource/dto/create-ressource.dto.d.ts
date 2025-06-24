export declare class CreateResourceDto {
    title: string;
    type: string;
    url?: string;
    content?: string;
    duration?: number;
    order?: number;
    isCompleted?: boolean;
    isSaved?: boolean;
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
}
