import { User } from '../../users/user.entity';
import { Module } from '../../modules/entities/module.entity';
import { Participant } from '../../participant/entities/participant.entity';
export declare class Formation {
    id: string;
    titre: string;
    description: string;
    archived: boolean;
    formateur: User;
    modules: Module[];
    participants: Participant[];
}
