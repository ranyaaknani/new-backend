import { Module } from '../../modules/entities/module.entity';
import { Ressource } from '../../ressource/entities/ressource.entity';
import { Quiz } from 'quiz/entities/quiz.entity';
export declare class Section {
    id: string;
    titre: string;
    module: Module;
    quizzes: Quiz[];
    ressources: Ressource[];
}
