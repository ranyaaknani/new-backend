import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceEntity } from './entities/ressource.entity';
import { DataSource, Repository } from 'typeorm';
import { ModuleEntity } from 'modules/entities/module.entity';
import { CreateResourceDto } from './dto/create-ressource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourceEntity)
    private resourcesRepository: Repository<ResourceEntity>,
    @InjectRepository(ModuleEntity)
    private modulesRepository: Repository<ModuleEntity>,
    private dataSource: DataSource,
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<ResourceEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const module = await this.modulesRepository.findOne({
        where: { id: createResourceDto.moduleId },
      });
      if (!module) {
        throw new NotFoundException(
          `Module with ID ${createResourceDto.moduleId} not found`,
        );
      }

      const resource = this.resourcesRepository.create({
        title: createResourceDto.title,
        type: createResourceDto.type,
        url: createResourceDto.url,
        content: createResourceDto.content,
        tableData: createResourceDto.tableData,
        fileName: createResourceDto.fileName,
        fileSize: createResourceDto.fileSize,
        previewUrl: createResourceDto.previewUrl,
        duration: createResourceDto.duration,
        order: createResourceDto.order ?? 0,
        isSaved: createResourceDto.isSaved || false,
        thumbnail: createResourceDto.thumbnail,
        description: createResourceDto.description,
        moduleId: createResourceDto.moduleId,
      });

      const savedResource = await queryRunner.manager.save(resource);
      await queryRunner.commitTransaction();
      return this.findOne(savedResource.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Failed to create resource: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ResourceEntity[]> {
    return this.resourcesRepository.find({
      relations: { module: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ResourceEntity> {
    const resource = await this.resourcesRepository.findOne({
      where: { id },
      relations: { module: true },
    });
    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }
    return resource;
  }

  async update(
    id: string,
    updateResourceDto: UpdateResourceDto,
  ): Promise<ResourceEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const resource = await this.findOne(id);

      if (updateResourceDto.title) resource.title = updateResourceDto.title;
      if (updateResourceDto.type) resource.type = updateResourceDto.type;
      if (updateResourceDto.url) resource.url = updateResourceDto.url;
      if (updateResourceDto.content)
        resource.content = updateResourceDto.content;
      if (updateResourceDto.tableData)
        resource.tableData = updateResourceDto.tableData;
      if (updateResourceDto.fileName)
        resource.fileName = updateResourceDto.fileName;
      if (updateResourceDto.fileSize)
        resource.fileSize = updateResourceDto.fileSize;
      if (updateResourceDto.previewUrl)
        resource.previewUrl = updateResourceDto.previewUrl;
      if (updateResourceDto.duration)
        resource.duration = updateResourceDto.duration;
      if (updateResourceDto.order !== undefined)
        resource.order = updateResourceDto.order;
      if (updateResourceDto.isSaved !== undefined)
        resource.isSaved = updateResourceDto.isSaved;
      if (updateResourceDto.isSaved !== undefined)
        resource.isSaved = updateResourceDto.isSaved;
      if (updateResourceDto.thumbnail)
        resource.thumbnail = updateResourceDto.thumbnail;
      if (updateResourceDto.description)
        resource.description = updateResourceDto.description;

      await queryRunner.manager.save(resource);
      await queryRunner.commitTransaction();
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Failed to update resource: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<void> {
    const resource = await this.findOne(id);
    await this.resourcesRepository.remove(resource);
  }
}
