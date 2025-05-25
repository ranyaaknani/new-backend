import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';
import { ModuleEntity } from './entities/module.entity';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formation)
    private formationsRepository: Repository<Formation>,
    @InjectRepository(ModuleEntity)
    private modulesRepository: Repository<ModuleEntity>,
  ) {}

  async create(createFormationDto: CreateFormationDto): Promise<Formation> {
    const formation = this.formationsRepository.create({
      titre: createFormationDto.titre,
      domaine: createFormationDto.domaine,
      image: createFormationDto.image,
      description: createFormationDto.description,
      objectifs: createFormationDto.objectifs,
      accessType: createFormationDto.accessType,
      invitation: createFormationDto.invitation,
      formateurId: createFormationDto.formateurId,
    });

    const savedFormation = await this.formationsRepository.save(formation);

    if (createFormationDto.modules?.length) {
      const modules = createFormationDto.modules.map((moduleData) =>
        this.modulesRepository.create({
          titre: moduleData.titre,
          questions: moduleData.questions || [],
          resources: moduleData.resources || [],
          formation: savedFormation,
        }),
      );

      await this.modulesRepository.save(modules);
    }

    return this.findOne(savedFormation.id);
  }

  findAll(): Promise<Formation[]> {
    return this.formationsRepository.find({
      relations: ['participants', 'modules', 'formateur'],
    });
  }

  async findOne(id: string): Promise<Formation> {
    const formation = await this.formationsRepository.findOne({
      where: { id },
      relations: ['participants', 'modules', 'formateur'],
    });

    if (!formation) {
      throw new NotFoundException(`Formation with ID ${id} not found`);
    }

    return formation;
  }

  async update(
    id: string,
    updateData: Partial<CreateFormationDto>,
  ): Promise<Formation> {
    const formation = await this.findOne(id);

    Object.assign(formation, {
      titre: updateData.titre || formation.titre,
      image: updateData.image || formation.image,
      domaine: updateData.domaine || formation.domaine,
      description: updateData.description || formation.description,
      objectifs: updateData.objectifs || formation.objectifs,
      accessType: updateData.accessType || formation.accessType,
      invitation: updateData.invitation || formation.invitation,
    });

    await this.formationsRepository.save(formation);

    if (updateData.modules) {
      await this.modulesRepository.delete({ formationId: id });

      const modules = updateData.modules.map((moduleData) => {
        return this.modulesRepository.create({
          titre: moduleData.titre,
          questions: moduleData.questions || [],
          resources: moduleData.resources || [],
          formation: formation,
        });
      });

      await this.modulesRepository.save(modules);
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const formation = await this.findOne(id);
    await this.formationsRepository.remove(formation);
  }
}
