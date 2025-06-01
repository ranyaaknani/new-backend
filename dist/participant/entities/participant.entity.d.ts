import { Formation } from '../../formation/entities/formation.entity';
import { Certificat } from 'certificat/entities/certificate.entity';
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
    formation: Formation;
    formationId: string;
    certificatsObtenus: Certificat[];
}
