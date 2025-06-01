import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsService } from './participant.service';
import { Participant } from './entities/participant.entity';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantsController {
    private readonly participantsService;
    constructor(participantsService: ParticipantsService);
    create(createParticipantDto: CreateParticipantDto): Promise<Participant>;
    findAll(): Promise<Participant[]>;
    getStatistics(): Promise<any>;
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
}
