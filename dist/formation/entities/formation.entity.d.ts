import { ModuleEntity } from './module.entity';
import { Formateur } from 'formateur/formateur.entity';
import { Participant } from 'participant/entities/participant.entity';
import { InvitationEntity } from 'invitation/invitation.entity';
export declare class Formation {
    id: string;
    titre: string;
    domaine: string;
    image: string;
    description: string;
    objectifs: string;
    accessType: string;
    formateur: Formateur;
    formateurId: string;
    modules: ModuleEntity[];
    invitations: InvitationEntity[];
    participants: Participant[];
    createdAt: Date;
    updatedAt: Date;
}
