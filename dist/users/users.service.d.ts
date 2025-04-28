import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(data: CreateUserDto): Promise<User>;
    findOneById(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
}
