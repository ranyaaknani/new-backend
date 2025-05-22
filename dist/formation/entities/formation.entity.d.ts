import { User } from '../../users/user.entity';
import { Module } from '../../modules/entities/module.entity';
import { Participant } from '../../participant/entities/participant.entity';
export declare class Formation {
    id: string;
    titre: string;
    image: string;
    domaine: string;
    description: string;
    objectifs: string;
    archived: boolean;
    accessType: 'private' | 'public';
    invitation: {
        mode: 'email' | 'link' | 'csv';
        emails: string[];
        linkGenerated: boolean;
        csvFile: any;
    };
    createdAt: Date;
    updatedAt: Date;
    formateur: User;
    modules: Module[];
    participants: Participant[];
}
