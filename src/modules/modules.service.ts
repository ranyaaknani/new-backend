import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity } from './entities/module.entity';
import { DataSource, Repository } from 'typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
import { ResourcesService } from 'ressource/ressource.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity)
    private modulesRepository: Repository<ModuleEntity>,
    @InjectRepository(Formation)
    private formationsRepository: Repository<Formation>,
    @InjectRepository(ResourceEntity)
    private resourcesRepository: Repository<ResourceEntity>,
    private resourcesService: ResourcesService,
    private dataSource: DataSource,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<ModuleEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const formation = await this.formationsRepository.findOne({
        where: { id: createModuleDto.formationId },
      });
      if (!formation) {
        throw new NotFoundException(
          `Formation with ID ${createModuleDto.formationId} not found`,
        );
      }

      const module = this.modulesRepository.create({
        titre: createModuleDto.titre,
        order: createModuleDto.order || 0,
        description: createModuleDto.description,
        duration: createModuleDto.duration,
        questions: createModuleDto.questions || [],
        formationId: createModuleDto.formationId,
      });

      const savedModule = await queryRunner.manager.save(module);

      if (createModuleDto.resources?.length) {
        const resources = createModuleDto.resources.map((resourceData, index) =>
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

      await queryRunner.commitTransaction();
      return this.findOne(savedModule.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new ConflictException(`Failed to create module: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ModuleEntity[]> {
    return this.modulesRepository.find({
      relations: { formation: true, resources: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ModuleEntity> {
    const module = await this.modulesRepository.findOne({
      where: { id },
      relations: { formation: true, resources: true },
      order: { resources: { order: 'ASC' } },
    });
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return module;
  }

  async update(
    id: string,
    updateModuleDto: UpdateModuleDto,
  ): Promise<ModuleEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const module = await this.findOne(id);

      if (updateModuleDto.titre) module.titre = updateModuleDto.titre;
      if (updateModuleDto.order !== undefined)
        module.order = updateModuleDto.order;
      if (updateModuleDto.description)
        module.description = updateModuleDto.description;
      if (updateModuleDto.duration) module.duration = updateModuleDto.duration;
      if (updateModuleDto.questions)
        module.questions = updateModuleDto.questions;

      await queryRunner.manager.save(module);

      if (updateModuleDto.resources) {
        await queryRunner.manager.delete(ResourceEntity, { moduleId: id });

        const resources = updateModuleDto.resources.map((resourceData, index) =>
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
            moduleId: id,
          }),
        );

        await queryRunner.manager.save(resources);
      }

      await queryRunner.commitTransaction();
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new ConflictException(`Failed to update module: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<void> {
    const module = await this.findOne(id);
    await this.modulesRepository.remove(module);
  }
}
