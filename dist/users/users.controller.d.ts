import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Role } from 'common/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(role?: Role): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    createUser(createUserDto: CreateUserDto & {
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
