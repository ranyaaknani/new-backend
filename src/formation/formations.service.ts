import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
import { InvitationEntity } from 'invitation/invitation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formateur } from 'formateur/formateur.entity';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formation)
    private formationsRepository: Repository<Formation>,
    @InjectRepository(Formateur)
    private formateurRepository: Repository<Formateur>,
    @InjectRepository(ModuleEntity)
    private modulesRepository: Repository<ModuleEntity>,
    @InjectRepository(InvitationEntity)
    private invitationsRepository: Repository<InvitationEntity>,
    @InjectRepository(ResourceEntity)
    private resourcesRepository: Repository<ResourceEntity>,
    private dataSource: DataSource,
  ) {}

  async create(createFormationDto: CreateFormationDto): Promise<Formation> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verify formateur exists
      const formateur = await this.formateurRepository.findOne({
        where: { id: createFormationDto.formateurId },
      });
      if (!formateur) {
        throw new NotFoundException(
          `Formateur with ID ${createFormationDto.formateurId} not found`,
        );
      }

      // Create Formation
      const formation = this.formationsRepository.create({
        titre: createFormationDto.titre,
        domaine: createFormationDto.domaine,
        image: createFormationDto.image,
        description: createFormationDto.description,
        objectifs: createFormationDto.objectifs,
        accessType: createFormationDto.accessType,
        formateurId: createFormationDto.formateurId,
      });

      const savedFormation = await queryRunner.manager.save(formation);

      // Create Invitation (if provided)
      if (createFormationDto.invitation) {
        const invitation = this.invitationsRepository.create({
          mode: createFormationDto.invitation.mode,
          emails: createFormationDto.invitation.emails,
          subject: createFormationDto.invitation.subject,
          message: createFormationDto.invitation.message,
          formationId: savedFormation.id,
        });
        await queryRunner.manager.save(invitation);
      }

      // Create Modules (if provided)
      if (createFormationDto.modules?.length) {
        for (const moduleData of createFormationDto.modules) {
          const module = this.modulesRepository.create({
            titre: moduleData.titre,
            order: moduleData.order || 0,
            description: moduleData.description,
            duration: moduleData.duration,
            questions: moduleData.questions || [],
            formationId: savedFormation.id,
          });

          const savedModule = await queryRunner.manager.save(module);

          if (moduleData.resources?.length) {
            const resources = moduleData.resources.map((resourceData, index) =>
              this.resourcesRepository.create({
                title: resourceData.title,
                type: resourceData.type,
                videoLink: resourceData.videoLink,
                pdfLink: resourceData.pdfLink,
                textLink: resourceData.textLink,
                content: resourceData.content,
                duration: resourceData.duration,
                order:
                  resourceData.order !== undefined ? resourceData.order : index,
                isCompleted: resourceData.isCompleted || false,
                thumbnail: resourceData.thumbnail,
                description: resourceData.description,
                moduleId: savedModule.id,
              }),
            );

            await queryRunner.manager.save(resources);
          }
        }
      }

      await queryRunner.commitTransaction();
      return this.findOne(savedFormation.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Failed to create formation: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Formation[]> {
    return this.formationsRepository.find({
      relations: {
        formateur: true,
        modules: {
          resources: true,
        },
        invitations: true,
        participants: true,
      },
      order: {
        createdAt: 'DESC',
        modules: {
          order: 'ASC',
          resources: {
            order: 'ASC',
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Formation> {
    const formation = await this.formationsRepository.findOne({
      where: { id },
      relations: {
        formateur: true,
        modules: {
          resources: true,
        },
        invitations: true,
        participants: true,
      },
      order: {
        modules: {
          order: 'ASC',
          resources: {
            order: 'ASC',
          },
        },
      },
    });

    if (!formation) {
      throw new NotFoundException(`Formation with ID ${id} not found`);
    }

    return formation;
  }

  async update(
    id: string,
    updateFormationDto: UpdateFormationDto,
  ): Promise<Formation> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const formation = await this.findOne(id);

      if (updateFormationDto.titre) formation.titre = updateFormationDto.titre;
      if (updateFormationDto.domaine)
        formation.domaine = updateFormationDto.domaine;
      if (updateFormationDto.image !== undefined)
        formation.image = updateFormationDto.image;
      if (updateFormationDto.description)
        formation.description = updateFormationDto.description;
      if (updateFormationDto.objectifs)
        formation.objectifs = updateFormationDto.objectifs;
      if (updateFormationDto.accessType)
        formation.accessType = updateFormationDto.accessType;
      if (updateFormationDto.formateurId)
        formation.formateurId = updateFormationDto.formateurId;

      await queryRunner.manager.save(formation);

      if (updateFormationDto.invitation) {
        await queryRunner.manager.delete(InvitationEntity, { formationId: id });

        const invitation = this.invitationsRepository.create({
          mode: updateFormationDto.invitation.mode,
          emails: updateFormationDto.invitation.emails,
          fromEmails: updateFormationDto.invitation.fromEmails,
          toEmails: updateFormationDto.invitation.toEmails,
          invitationLink: updateFormationDto.invitation.invitationLink,
          linkGenerated: updateFormationDto.invitation.linkGenerated || false,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          csvFile: updateFormationDto.invitation.csvFile,
          csvImage: updateFormationDto.invitation.csvImage,
          subject: updateFormationDto.invitation.subject,
          message: updateFormationDto.invitation.message,
          expiresAt: updateFormationDto.invitation.expiresAt
            ? new Date(updateFormationDto.invitation.expiresAt)
            : undefined,
          isActive: updateFormationDto.invitation.isActive !== false,
          formationId: id,
        });

        await queryRunner.manager.save(invitation);
      }

      if (updateFormationDto.modules) {
        await queryRunner.manager.delete(ModuleEntity, { formationId: id });

        for (const moduleData of updateFormationDto.modules) {
          const module = this.modulesRepository.create({
            titre: moduleData.titre,
            order: moduleData.order || 0,
            description: moduleData.description,
            duration: moduleData.duration,
            questions: moduleData.questions || [],
            formationId: id,
          });

          const savedModule = await queryRunner.manager.save(module);

          if (moduleData.resources?.length) {
            const resources = moduleData.resources.map((resourceData, index) =>
              this.resourcesRepository.create({
                title: resourceData.title,
                type: resourceData.type,
                videoLink: resourceData.videoLink,
                pdfLink: resourceData.pdfLink,
                textLink: resourceData.textLink,
                content: resourceData.content,
                duration: resourceData.duration,
                order:
                  resourceData.order !== undefined ? resourceData.order : index,
                isCompleted: resourceData.isCompleted || false,
                thumbnail: resourceData.thumbnail,
                description: resourceData.description,
                moduleId: savedModule.id,
              }),
            );

            await queryRunner.manager.save(resources);
          }
        }
      }

      await queryRunner.commitTransaction();
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Failed to update formation: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<void> {
    const formation = await this.findOne(id);
    await this.formationsRepository.remove(formation);
  }

  async findByFormateur(formateurId: string): Promise<Formation[]> {
    return this.formationsRepository.find({
      where: { formateurId },
      relations: {
        modules: {
          resources: true,
        },
        invitations: true,
        participants: true,
      },
      order: {
        createdAt: 'DESC',
        modules: {
          order: 'ASC',
          resources: {
            order: 'ASC',
          },
        },
      },
    });
  }

  async findPublicFormations(): Promise<Formation[]> {
    return this.formationsRepository.find({
      where: { accessType: 'public' },
      relations: {
        formateur: true,
        modules: {
          resources: true,
        },
      },
      order: {
        createdAt: 'DESC',
        modules: {
          order: 'ASC',
          resources: {
            order: 'ASC',
          },
        },
      },
    });
  }
}
