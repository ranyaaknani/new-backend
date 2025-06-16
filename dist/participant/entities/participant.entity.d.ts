import { Formation } from 'formation/entities/formation.entity';
export declare class Participant {
    id: string;
    nom: string;
    email: string;
    niveau: string;
    score: number;
    certificatObtenu: boolean;
    statusFormation: string;
    isActive: boolean;
    dateInscription: Date;
    dateModification: Date;
    formationId: string;
    formation: Formation;
}
