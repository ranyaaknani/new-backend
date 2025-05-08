import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formateur } from './formateur.entity';
import { Formation } from 'formation/entities/formation.entity';

@Injectable()
export class FormateurService {
  constructor(
    @InjectRepository(Formation)
    private formationRepository: Repository<Formation>,
  ) {}

  async getFormations(formateurId: string) {
    return this.formationRepository.find({
      where: {
        formateur: { id: formateurId },
      },
    });
  }

  async addFormation(formateurId: string, data: any) {
    const formation = this.formationRepository.create({
      ...data,
      formateur: { id: formateurId },
    });
    return this.formationRepository.save(formation);
  }
}
