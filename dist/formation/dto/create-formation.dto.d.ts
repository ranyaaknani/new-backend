declare class QCMOptionDto {
    texte: string;
    justification: string;
    isCorrect: boolean;
}
declare class QuestionDto {
    question: string;
    options: QCMOptionDto[];
}
declare class ResourceDto {
    type: 'video' | 'pdf' | 'word' | 'paragraph' | 'table';
    url?: string;
    content?: string;
    columns?: string[];
    rows?: string[][];
}
declare class ModuleDto {
    titre: string;
    questions: QuestionDto[];
    resources: ResourceDto[];
}
declare class InvitationDto {
    mode: 'email' | 'link' | 'csv';
    emails: string[];
    linkGenerated: boolean;
    csvFile: any;
}
export declare class CreateFormationDto {
    titre: string;
    image?: string;
    domaine: string;
    description: string;
    objectifs?: string;
    modules: ModuleDto[];
    accessType: 'private' | 'public';
    invitation: InvitationDto;
}
export {};
