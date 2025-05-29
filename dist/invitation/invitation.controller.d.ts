import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationEntity } from './invitation.entity';
import { InvitationsService } from './invitation.service';
export declare class InvitationsController {
    private readonly invitationsService;
    constructor(invitationsService: InvitationsService);
    create(createInvitationDto: CreateInvitationDto): Promise<{
        success: boolean;
        message: string;
        data: InvitationEntity;
    }>;
    findAll(): Promise<InvitationEntity[]>;
    findOne(id: string): Promise<InvitationEntity>;
    remove(id: string): Promise<void>;
}
