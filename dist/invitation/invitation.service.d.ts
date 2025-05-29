import { InvitationEntity } from './invitation.entity';
import { DataSource, Repository } from 'typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';
export declare class InvitationsService {
    private invitationsRepository;
    private formationsRepository;
    private dataSource;
    constructor(invitationsRepository: Repository<InvitationEntity>, formationsRepository: Repository<Formation>, dataSource: DataSource);
    create(createInvitationDto: CreateInvitationDto): Promise<InvitationEntity>;
    findAll(): Promise<InvitationEntity[]>;
    findOne(id: string): Promise<InvitationEntity>;
    remove(id: string): Promise<void>;
}
