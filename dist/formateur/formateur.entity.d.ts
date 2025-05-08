import { Formation } from 'formation/entities/formation.entity';
export declare class Formateur {
    id: number;
    nom: string;
    email: string;
    motDePasse: string;
    formations: Formation[];
}
