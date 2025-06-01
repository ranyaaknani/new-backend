import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './entities/participant.entity';
import { Formation } from 'formation/entities/formation.entity';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantsService {
    private participantRepository;
    private formationRepository;
    constructor(participantRepository: Repository<Participant>, formationRepository: Repository<Formation>);
    create(createParticipantDto: CreateParticipantDto): Promise<Participant>;
    findAll(): Promise<Participant[]>;
    findByFormateur(formateurId: string): Promise<Participant[]>;
    findByFormation(formationId: string): Promise<Participant[]>;
    findOne(id: string): Promise<Participant>;
    update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<Participant>;
    updateStatus(id: string, status: string): Promise<Participant>;
    toggleActive(id: string): Promise<Participant>;
    generateCertificate(id: string): Promise<Participant>;
    sendEmailReminder(id: string): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<void>;
    getStatistics(): Promise<any>;
}
