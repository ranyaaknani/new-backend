import { CreateInvitationDto } from 'invitation/dto/create-invitation.dto';
import { CreateModuleDto } from 'modules/dto/create-module.dto';
export declare class CreateFormationDto {
    titre: string;
    domaine: string;
    image?: string;
    description: string;
    startDate: Date;
    endDate: Date;
    objectifs: string;
    accessType: 'public' | 'private';
    userId: string;
    invitation?: CreateInvitationDto;
    modules?: CreateModuleDto[];
}
