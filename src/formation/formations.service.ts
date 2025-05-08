import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formation)
    private formationsRepository: Repository<Formation>,
  ) {}

  create(createFormationDto: CreateFormationDto): Promise<Formation> {
    const formation = this.formationsRepository.create(createFormationDto);
    return this.formationsRepository.save(formation);
  }

  findAll(): Promise<Formation[]> {
    return this.formationsRepository.find({ relations: ['participants'] });
  }

  async findOne(id: string): Promise<Formation> {
    const formation = await this.formationsRepository.findOne({
      where: { id },
      relations: ['participants'],
    });

    if (!formation) {
      throw new NotFoundException(`Formation with ID ${id} not found`);
    }

    return formation;
  }

  // Tu peux ajouter update() et remove() plus tard si nécessaire
}
