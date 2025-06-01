import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificat } from './entities/certificate.entity';
import { Repository } from 'typeorm';
import { User } from 'users/user.entity';
import { CreateCertificateDto } from './dto/create-certification.dto';
import { UpdateCertificateDto } from './dto/update-certification.dto';
import { Formation } from 'formation/entities/formation.entity';

@Injectable()
export class CertificatService {
  constructor(
    @InjectRepository(Certificat)
    private certificatRepository: Repository<Certificat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Formation)
    private formationRepository: Repository<Formation>,
  ) {}

  async create(
    createCertificateDto: CreateCertificateDto,
  ): Promise<Certificat> {
    // Check if user exists and has participant role
    const user = await this.userRepository.findOne({
      where: { id: createCertificateDto.participantId },
      relations: ['formations'],
    });

    if (!user) {
      throw new NotFoundException('Participant not found');
    }

    // Verify user has the specific formation
    const userHasFormation = user.formations?.some(
      (formation) => formation.id === createCertificateDto.formationId,
    );

    if (!userHasFormation) {
      throw new BadRequestException('User is not enrolled in this formation');
    }

    // Check if formation exists
    const formation = await this.formationRepository.findOne({
      where: { id: createCertificateDto.formationId },
    });

    if (!formation) {
      throw new NotFoundException('Formation not found');
    }

    // Create certificate
    const certificat = this.certificatRepository.create({
      nomParticipant: createCertificateDto.nomParticipant,
      formation: createCertificateDto.formation,
      formationId: createCertificateDto.formationId,
      dateObtention: new Date(),
      urlPdf: `certificates/${createCertificateDto.participantId}-${createCertificateDto.formationId}.pdf`,
      participants: [user],
      formationEntity: formation,
    });

    const savedCertificat = await this.certificatRepository.save(certificat);

    // Update user's hasCertificate status
    user.hasCertificate = true;
    await this.userRepository.save(user);

    return savedCertificat;
  }

  async findAll(): Promise<Certificat[]> {
    return this.certificatRepository.find({
      relations: ['participants', 'formationEntity'],
    });
  }

  async findOne(id: string): Promise<Certificat> {
    const certificat = await this.certificatRepository.findOne({
      where: { id },
      relations: ['participants', 'formationEntity'],
    });

    if (!certificat) {
      throw new NotFoundException('Certificate not found');
    }

    return certificat;
  }

  async findByParticipant(participantId: string): Promise<Certificat[]> {
    return this.certificatRepository
      .createQueryBuilder('certificat')
      .leftJoinAndSelect('certificat.participants', 'user')
      .leftJoinAndSelect('certificat.formationEntity', 'formation')
      .where('user.id = :participantId', { participantId })
      .andWhere('user.role = :role', { role: 'participant' })
      .getMany();
  }

  async update(
    id: string,
    updateCertificateDto: UpdateCertificateDto,
  ): Promise<Certificat> {
    const certificat = await this.findOne(id);

    if (updateCertificateDto.formationId) {
      const formation = await this.formationRepository.findOne({
        where: { id: updateCertificateDto.formationId },
      });

      if (!formation) {
        throw new NotFoundException('Formation not found');
      }
    }

    Object.assign(certificat, updateCertificateDto);

    return this.certificatRepository.save(certificat);
  }

  async remove(id: string): Promise<void> {
    const certificat = await this.findOne(id);
    await this.certificatRepository.remove(certificat);
  }
}
