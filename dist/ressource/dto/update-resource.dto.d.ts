export declare class UpdateResourceDto {
    title?: string;
    type?: string;
    url?: string;
    content?: string;
    duration?: number;
    order?: number;
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
}
