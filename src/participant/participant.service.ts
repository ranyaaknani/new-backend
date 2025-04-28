import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './participant.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    const participant = this.participantRepository.create(createParticipantDto);
    return this.participantRepository.save(participant);
  }

  findAll(): Promise<Participant[]> {
    return this.participantRepository.find();
  }

  async findOne(id: string): Promise<Participant> {
    const participant = await this.participantRepository.findOne({
      where: { id: Number(id) }, // CORRECTION ici ! id doit être un number
    });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    return participant;
  }
}
