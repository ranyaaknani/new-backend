import { Participant } from '../../participant/entities/participant.entity';
export declare class Certificat {
    id: number;
    nomParticipant: string;
    formation: string;
    dateObtention: Date;
    urlPdf: string;
    participants: Participant[];
}
