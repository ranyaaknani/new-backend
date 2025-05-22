import { Formation } from '../../formation/entities/formation.entity';
import { Section } from 'section/entities/section.entity';
interface QCMOption {
    texte: string;
    justification: string;
    isCorrect: boolean;
}
interface Question {
    question: string;
    options: QCMOption[];
}
interface Resource {
    type: 'video' | 'pdf' | 'word' | 'paragraph' | 'table';
    url?: string;
    content?: string;
    columns?: string[];
    rows?: string[][];
}
export declare class Module {
    id: string;
    titre: string;
    sections: Section[];
    questions: Question[];
    resources: Resource[];
    createdAt: Date;
    updatedAt: Date;
    formation: Formation;
}
export {};
