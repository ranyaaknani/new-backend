import { Formation } from 'formation/entities/formation.entity';
import { User } from 'users/user.entity';
export declare class Certificat {
    id: string;
    nomParticipant: string;
    formation: string;
    dateObtention: Date;
    urlPdf: string;
    formationId: string;
    formationEntity: Formation;
    participants: User[];
}
