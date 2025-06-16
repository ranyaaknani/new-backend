import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'common/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { Formation } from 'formation/entities/formation.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Formation)
    private formationsRepository: Repository<Formation>,
  ) {}

  async findAll(role?: Role): Promise<User[]> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.formations', 'formations');

    if (role) {
      queryBuilder.where('user.role = :role', { role });
    }

    return queryBuilder.getMany();
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async remove(user: User): Promise<{ deleted: boolean }> {
    await this.userRepository.remove(user);
    return { deleted: true };
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} introuvable`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUserWithFormation(
    createUserDto: CreateUserDto & { formationId?: string },
  ) {
    try {
      const { formationId, ...userData } = createUserDto;

      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        if (formationId) {
          const formation = await this.formationsRepository.findOne({
            where: { id: formationId },
            relations: ['participants'],
          });

          if (!formation) {
            throw new Error('Formation non trouvée');
          }

          const isAlreadyParticipant = formation.participants.some(
            (participant) => participant.id === existingUser.id,
          );

          if (isAlreadyParticipant) {
            throw new Error(
              'Cet utilisateur est déjà participant à cette formation',
            );
          }

          formation.participants.push(existingUser);
          await this.formationsRepository.save(formation);

          return {
            success: true,
            message: 'Utilisateur existant ajouté avec succès à la formation',
            user: {
              id: existingUser.id,
              email: existingUser.email,
              name: existingUser.name,
              role: existingUser.role,
              status: existingUser.status,
            },
          };
        } else {
          throw new Error(
            'Un utilisateur avec cette adresse email existe déjà',
          );
        }
      }

      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user);

      if (formationId) {
        const formation = await this.formationsRepository.findOne({
          where: { id: formationId },
          relations: ['participants'],
        });

        if (!formation) {
          throw new Error('Formation non trouvée');
        }

        if (!formation.participants) {
          formation.participants = [];
        }

        formation.participants.push(savedUser);
        await this.formationsRepository.save(formation);
      }

      return {
        success: true,
        message: formationId
          ? 'Participant créé et ajouté avec succès à la formation'
          : 'Utilisateur créé avec succès',
        user: {
          id: savedUser.id,
          email: savedUser.email,
          name: savedUser.name,
          role: savedUser.role,
          status: savedUser.status,
        },
      };
    } catch (error) {
      throw new Error(
        error.message || "Erreur lors de la création de l'utilisateur",
      );
    }
  }
}
