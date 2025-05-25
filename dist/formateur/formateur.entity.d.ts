import { Formation } from 'formation/entities/formation.entity';
export declare class Formateur {
    id: string;
    nom: string;
    email: string;
    password: string;
    formations: Formation[];
    createdAt: Date;
    updatedAt: Date;
}
