import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'common/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { Formation } from 'formation/entities/formation.entity';
export declare class UsersService {
    private userRepository;
    private formationsRepository;
    constructor(userRepository: Repository<User>, formationsRepository: Repository<Formation>);
    findAll(role?: Role): Promise<User[]>;
    update(id: string, updateData: UpdateUserDto): Promise<User>;
    remove(user: User): Promise<{
        deleted: boolean;
    }>;
    create(data: CreateUserDto): Promise<User>;
    findOneById(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    createUserWithFormation(createUserDto: CreateUserDto & {
        formationId?: string;
    }): Promise<{
        success: boolean;
        message: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: Role;
            status: import("./user.entity").UserStatus;
        };
    }>;
}
