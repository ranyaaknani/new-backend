export declare class ResourceDto {
    type: string;
    url?: string;
    content?: string;
}
export declare class ModuleDto {
    titre: string;
    resources: ResourceDto[];
    questions?: any[];
}
export declare class InvitationDto {
    mode: string;
    emails: string[];
    linkGenerated?: boolean;
    csvFile?: any;
}
export declare class CreateFormationDto {
    titre: string;
    domaine: string;
    image?: string;
    description: string;
    objectifs: string;
    accessType: 'public' | 'private';
    formateurId: string;
    invitation: InvitationDto;
    modules: ModuleDto[];
}
