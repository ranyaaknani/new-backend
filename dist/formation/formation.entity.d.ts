import { Formateur } from 'formateur/formateur.entity';
export declare class Formation {
    id: number;
    titre: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    formateur: Formateur;
    participants: any;
}
