import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './participant.entity';
export declare class ParticipantsService {
    private participantRepository;
    constructor(participantRepository: Repository<Participant>);
    create(createParticipantDto: CreateParticipantDto): Promise<Participant>;
    findAll(): Promise<Participant[]>;
    findOne(id: string): Promise<Participant>;
}
