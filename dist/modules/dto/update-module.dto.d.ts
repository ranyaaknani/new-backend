import { CreateResourceDto } from 'ressource/dto/create-ressource.dto';
export declare class UpdateModuleDto {
    titre?: string;
    order?: number;
    description?: string;
    duration?: number;
    resources?: CreateResourceDto[];
    questions?: any[];
}
