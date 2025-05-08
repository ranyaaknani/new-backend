import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userRepository;
    findAll(): Promise<User[]>;
    update(user: User): Promise<User>;
    remove(user: User): Promise<{
        deleted: boolean;
    }>;
    constructor(userRepository: Repository<User>);
    create(data: CreateUserDto): Promise<User>;
    findOneById(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
}
