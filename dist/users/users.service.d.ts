import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'common/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userRepository;
    findAll(role?: Role): Promise<User[]>;
    update(id: string, updateData: UpdateUserDto): Promise<User>;
    remove(user: User): Promise<{
        deleted: boolean;
    }>;
    constructor(userRepository: Repository<User>);
    create(data: CreateUserDto): Promise<User>;
    findOneById(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
}
