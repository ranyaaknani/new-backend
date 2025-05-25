import { Ressource } from '../../ressource/entities/ressource.entity';
import { Quiz } from 'quiz/entities/quiz.entity';
import { Module } from './module.entity';
export declare class Section {
    id: string;
    titre: string;
    module: Module;
    quizzes: Quiz[];
    ressources: Ressource[];
}
