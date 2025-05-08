import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsService } from './participant.service';
import { Participant } from './entities/participant.entity';
export declare class ParticipantsController {
    private readonly participantsService;
    constructor(participantsService: ParticipantsService);
    create(createParticipantDto: CreateParticipantDto): Promise<Participant>;
    findAll(): Promise<Participant[]>;
    findOne(id: string): Promise<Participant>;
}
