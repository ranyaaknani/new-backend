import { Formateur } from 'formateur/formateur.entity';
import { Participant } from 'participant/entities/participant.entity';
import { InvitationEntity } from 'invitation/invitation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
export declare class Formation {
    id: string;
    titre: string;
    domaine: string;
    image: string;
    description: string;
    objectifs: string;
    accessType: string;
    formateurId: string;
    formateur: Formateur;
    modules: ModuleEntity[];
    invitations: InvitationEntity[];
    participants: Participant[];
    createdAt: Date;
    updatedAt: Date;
}
