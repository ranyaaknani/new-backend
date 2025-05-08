import { Formation } from '../../formation/entities/formation.entity';
import { Certificat } from 'certificat/entities/ressource.entity';
export declare class Participant {
    id: string;
    nom: string;
    email: string;
    formationsSuivies: Formation[];
    certificatsObtenus: Certificat[];
}
