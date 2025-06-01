import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formateur } from './formateur.entity';
import { CreateFormateurDto } from './dto/create-formateur.dto';
import * as bcrypt from 'bcrypt';
import { UpdateFormateurDto } from './dto/update-formateur.dto';

@Injectable()
export class FormateurService {
  constructor(
    @InjectRepository(Formateur)
    private readonly formateurRepository: Repository<Formateur>,
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

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createFormateurDto.password, salt);

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

  async updateFormateur(
    id: string,
    updateFormateurDto: UpdateFormateurDto,
  ): Promise<Omit<Formateur, 'password'>> {
    const formateur = await this.formateurRepository.findOne({ where: { id } });

    if (!formateur) {
      throw new NotFoundException('Formateur non trouvé');
    }

    if (
      updateFormateurDto.email &&
      updateFormateurDto.email !== formateur.email
    ) {
      const existingFormateur = await this.formateurRepository.findOne({
        where: { email: updateFormateurDto.email },
      });
      if (existingFormateur) {
        throw new ConflictException('Un formateur avec cet email existe déjà');
      }
    }

    await this.formateurRepository.update(id, updateFormateurDto);

    const updatedFormateur = await this.formateurRepository.findOne({
      where: { id },
      relations: ['formations'],
      select: ['id', 'nom', 'email', 'createdAt', 'updatedAt'],
    });

    if (!updatedFormateur) {
      throw new NotFoundException('Formateur non trouvé après mise à jour');
    }

    return updatedFormateur;
  }

  async deleteFormateur(id: string): Promise<{ message: string }> {
    const formateur = await this.formateurRepository.findOne({
      where: { id },
      relations: ['formations'],
    });

    if (!formateur) {
      throw new NotFoundException('Formateur non trouvé');
    }

    if (formateur.formations && formateur.formations.length > 0) {
      throw new BadRequestException(
        'Impossible de supprimer ce formateur car il a des formations associées',
      );
    }

    await this.formateurRepository.delete(id);
    return { message: 'Formateur deleted successfully' };
  }

  async getFormateurById(id: string): Promise<Omit<Formateur, 'password'>> {
    const formateur = await this.formateurRepository.findOne({
      where: { id },
      relations: ['formations'],
      select: ['id', 'nom', 'email', 'createdAt', 'updatedAt'],
    });

    if (!formateur) {
      throw new NotFoundException('Formateur non trouvé');
    }

    return formateur;
  }
}
