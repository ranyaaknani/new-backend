import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvitationEntity } from './invitation.entity';
import { DataSource, Repository } from 'typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(InvitationEntity)
    private invitationsRepository: Repository<InvitationEntity>,
    @InjectRepository(Formation)
    private formationsRepository: Repository<Formation>,
    private dataSource: DataSource,
  ) {}

  async create(
    createInvitationDto: CreateInvitationDto,
  ): Promise<InvitationEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const formation = await this.formationsRepository.findOne({
        where: { id: createInvitationDto.formationId },
      });
      if (!formation) {
        throw new NotFoundException(
          `Formation with ID ${createInvitationDto.formationId} not found`,
        );
      }

      const invitation = this.invitationsRepository.create({
        mode: createInvitationDto.mode,
        emails: createInvitationDto.emails,
        fromEmails: createInvitationDto.fromEmails,
        toEmails: createInvitationDto.toEmails,
        invitationLink: createInvitationDto.invitationLink,
        linkGenerated: createInvitationDto.linkGenerated || false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        csvFile: createInvitationDto.csvFile,
        csvImage: createInvitationDto.csvImage,
        subject: createInvitationDto.subject,
        message: createInvitationDto.message,
        expiresAt: createInvitationDto.expiresAt
          ? new Date(createInvitationDto.expiresAt)
          : undefined,
        isActive: createInvitationDto.isActive !== false,
        formationId: createInvitationDto.formationId,
      });

      const savedInvitation = await queryRunner.manager.save(invitation);
      await queryRunner.commitTransaction();
      return this.findOne(savedInvitation.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Failed to create invitation: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<InvitationEntity[]> {
    return this.invitationsRepository.find({
      relations: { formation: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<InvitationEntity> {
    const invitation = await this.invitationsRepository.findOne({
      where: { id },
      relations: { formation: true },
    });
    if (!invitation) {
      throw new NotFoundException(`Invitation with ID ${id} not found`);
    }
    return invitation;
  }

  async remove(id: string): Promise<void> {
    const invitation = await this.findOne(id);
    await this.invitationsRepository.remove(invitation);
  }
}
