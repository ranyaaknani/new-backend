import { Section } from 'section/entities/section.entity';
export declare class Quiz {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    justification: string;
    section: Section;
}
