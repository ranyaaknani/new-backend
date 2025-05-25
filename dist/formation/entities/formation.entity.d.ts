import { ModuleEntity } from './module.entity';
import { Formateur } from 'formateur/formateur.entity';
import { Participant } from 'participant/entities/participant.entity';
export declare class Formation {
    id: string;
    titre: string;
    domaine: string;
    image: string;
    description: string;
    objectifs: string;
    accessType: string;
    invitation: {
        mode: string;
        emails: string[];
        linkGenerated: boolean;
        csvFile?: any;
    };
    formateur: Formateur;
    formateurId: string;
    modules: ModuleEntity[];
    participants: Participant[];
    createdAt: Date;
    updatedAt: Date;
}
