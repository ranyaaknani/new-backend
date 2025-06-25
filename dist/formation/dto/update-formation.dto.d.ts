import { CreateInvitationDto } from 'invitation/dto/create-invitation.dto';
import { CreateModuleDto } from 'modules/dto/create-module.dto';
export declare class UpdateFormationDto {
    titre?: string;
    domaine?: string;
    image?: string;
    description?: string;
    objectifs?: string;
    startDate: Date;
    endDate: Date;
    accessType?: 'public' | 'private';
    userId?: string;
    invitation?: CreateInvitationDto;
    modules?: CreateModuleDto[];
    participantIds?: string[];
}
