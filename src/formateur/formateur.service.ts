import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Formation } from '../formation/formation.entity';
import { Repository } from 'typeorm';
import { Formateur } from './formateur.entity';

@Injectable()
export class FormateurService {
  constructor(
    @InjectRepository(Formation)
    private formationRepository: Repository<Formation>,
  ) {}

  async getFormations(formateurId: number) {
    return this.formationRepository.find({ where: { formateur: { id: formateurId } } });
  }

  async addFormation(formateurId: number, data: any) {
    const formation = this.formationRepository.create({
      ...data,
      formateur: { id: formateurId },
    });
    return this.formationRepository.save(formation);
  }
}
