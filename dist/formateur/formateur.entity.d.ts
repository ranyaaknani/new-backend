import { Formation } from 'formation/formation.entity';
export declare class Formateur {
    id: number;
    nom: string;
    email: string;
    motDePasse: string;
    formations: Formation[];
}
