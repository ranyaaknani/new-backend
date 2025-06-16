import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './entities/participant.entity';
import { Formation } from 'formation/entities/formation.entity';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
    @InjectRepository(Formation)
    private formationRepository: Repository<Formation>,
  ) {}

  async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    // Verify that formation exists
    const formation = await this.formationRepository.findOne({
      where: { id: createParticipantDto.formationId },
      relations: ['formateur'],
    });

    if (!formation) {
      throw new NotFoundException(
        `Formation with ID ${createParticipantDto.formationId} not found`,
      );
    }

    const participant = this.participantRepository.create({
      ...createParticipantDto,
      formation,
    });

    return this.participantRepository.save(participant);
  }

  async findAll(): Promise<Participant[]> {
    return this.participantRepository.find({
      relations: ['formation', 'formation.formateur'],
      order: { dateInscription: 'DESC' },
    });
  }

  async findByFormateur(formateurId: string): Promise<Participant[]> {
    return this.participantRepository.find({
      where: {
        formation: {
          userId: formateurId,
        },
      },
      relations: ['formation', 'formation.formateur'],
      order: { dateInscription: 'DESC' },
    });
  }

  async findByFormation(formationId: string): Promise<Participant[]> {
    return this.participantRepository.find({
      where: { formationId },
      relations: ['formation', 'formation.formateur'],
      order: { dateInscription: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Participant> {
    const participant = await this.participantRepository.findOne({
      where: { id },
      relations: ['formation', 'formation.formateur'],
    });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    return participant;
  }

  async update(
    id: string,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    const participant = await this.findOne(id);

    Object.assign(participant, updateParticipantDto);

    return this.participantRepository.save(participant);
  }

  async updateStatus(id: string, status: string): Promise<Participant> {
    const participant = await this.findOne(id);
    participant.statusFormation = status;
    return this.participantRepository.save(participant);
  }

  async toggleActive(id: string): Promise<Participant> {
    const participant = await this.findOne(id);
    participant.isActive = !participant.isActive;
    return this.participantRepository.save(participant);
  }

  async generateCertificate(id: string): Promise<Participant> {
    const participant = await this.findOne(id);

    if (participant.score < 70) {
      throw new BadRequestException(
        'Score minimum de 70% requis pour obtenir le certificat',
      );
    }

    participant.certificatObtenu = true;
    participant.statusFormation = 'Terminé';

    return this.participantRepository.save(participant);
  }

  async sendEmailReminder(id: string): Promise<{ message: string }> {
    const participant = await this.findOne(id);
    console.log(`Sending email reminder to: ${participant.email}`);

    return { message: `Rappel envoyé à ${participant.email}` };
  }

  async remove(id: string): Promise<void> {
    const participant = await this.findOne(id);
    await this.participantRepository.remove(participant);
  }

  async getStatistics(): Promise<any> {
    const total = await this.participantRepository.count();
    const actifs = await this.participantRepository.count({
      where: { isActive: true },
    });
    const certificats = await this.participantRepository.count({
      where: { certificatObtenu: true },
    });
    const enCours = await this.participantRepository.count({
      where: { statusFormation: 'En cours' },
    });

    return {
      total,
      actifs,
      inactifs: total - actifs,
      certificats,
      enCours,
      termines: await this.participantRepository.count({
        where: { statusFormation: 'Terminé' },
      }),
    };
  }
}
