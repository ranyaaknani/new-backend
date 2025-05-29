import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { ModuleEntity } from 'formation/entities/module.entity';
import { Formateur } from './formateur.entity';
import { CreateFormateurDto } from './dto/create-formateur.dto';

@Injectable()
export class FormateurService {
  constructor(
    @InjectRepository(Formateur)
    private readonly formateurRepository: Repository<Formateur>,

    @InjectRepository(Formation)
    private readonly formationRepository: Repository<Formation>,

    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
  ) {}

  async createFormateur(
    createFormateurDto: CreateFormateurDto,
  ): Promise<Omit<Formateur, 'password'>> {
    const existingFormateur = await this.formateurRepository.findOne({
      where: { email: createFormateurDto.email },
    });

    if (existingFormateur) {
      throw new ConflictException('Un formateur avec cet email existe déjà');
    }

    const hashedPassword = createFormateurDto.password;

    const formateur = this.formateurRepository.create({
      ...createFormateurDto,
      password: hashedPassword,
    });

    const savedFormateur = await this.formateurRepository.save(formateur);

    const { ...result } = savedFormateur;
    return result;
  }

  async getAllFormateurs(): Promise<Omit<Formateur, 'password'>[]> {
    const formateurs = await this.formateurRepository.find({
      relations: ['formations'],
      select: ['id', 'nom', 'email', 'createdAt', 'updatedAt'],
    });
    return formateurs;
  }
}
