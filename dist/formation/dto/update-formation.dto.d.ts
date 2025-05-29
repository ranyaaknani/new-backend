import { CreateInvitationDto } from 'invitation/dto/create-invitation.dto';
import { CreateModuleDto } from 'modules/dto/create-module.dto';
export declare class UpdateFormationDto {
    titre?: string;
    domaine?: string;
    image?: string;
    description?: string;
    objectifs?: string;
    accessType?: 'public' | 'private';
    formateurId?: string;
    invitation?: CreateInvitationDto;
    modules?: CreateModuleDto[];
}
