import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';
import { Module } from 'modules/entities/module.entity';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formation)
    private formationsRepository: Repository<Formation>,
    @InjectRepository(Module)
    private modulesRepository: Repository<Module>,
  ) {}

  async create(createFormationDto: CreateFormationDto): Promise<Formation> {
    const formation = this.formationsRepository.create({
      titre: createFormationDto.titre,
      image: createFormationDto.image,
      domaine: createFormationDto.domaine,
      description: createFormationDto.description,
      objectifs: createFormationDto.objectifs,
      accessType: createFormationDto.accessType,
      invitation: createFormationDto.invitation,
    });

    const savedFormation = await this.formationsRepository.save(formation);

    if (createFormationDto.modules && createFormationDto.modules.length > 0) {
      const modules = createFormationDto.modules.map((moduleData) => {
        const module = this.modulesRepository.create({
          titre: moduleData.titre,
          questions: moduleData.questions,
          resources: moduleData.resources,
          formation: savedFormation,
        });
        return module;
      });

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
      await this.modulesRepository.delete({ formation: { id } });

      const modules = updateData.modules.map((moduleData) => {
        return this.modulesRepository.create({
          titre: moduleData.titre,
          questions: moduleData.questions,
          resources: moduleData.resources,
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

  async archive(id: string): Promise<Formation> {
    const formation = await this.findOne(id);
    formation.archived = true;
    return this.formationsRepository.save(formation);
  }
}
