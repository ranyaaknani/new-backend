export declare class CreateResourceDto {
    title: string;
    type: string;
    videoLink?: string;
    pdfLink?: string;
    textLink?: string;
    content?: string;
    duration?: number;
    order?: number;
    isCompleted?: boolean;
    thumbnail?: string;
    description?: string;
}
export declare class CreateModuleDto {
    titre: string;
    order?: number;
    description?: string;
    duration?: number;
    resources: CreateResourceDto[];
    questions?: any[];
}
export declare class CreateInvitationDto {
    mode: string;
    emails?: string[];
    fromEmails?: string[];
    toEmails?: string[];
    invitationLink?: string;
    linkGenerated?: boolean;
    csvFile?: any;
    csvImage?: string;
    subject?: string;
    message?: string;
    expiresAt?: string;
    isActive?: boolean;
}
export declare class CreateFormationDto {
    titre: string;
    domaine: string;
    image?: string;
    description: string;
    objectifs: string;
    accessType: 'public' | 'private';
    formateurId: string;
    invitation: CreateInvitationDto;
    modules: CreateModuleDto[];
}
