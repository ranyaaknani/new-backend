import { Formation } from '../../formation/entities/formation.entity';
import { Section } from 'section/entities/section.entity';
export declare class Module {
    id: string;
    titre: string;
    formation: Formation;
    sections: Section[];
}
