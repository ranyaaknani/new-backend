import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'common/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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
}
