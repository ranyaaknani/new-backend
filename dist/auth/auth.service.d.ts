import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login({ email, password }: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(dto: CreateUserDto): Promise<import("../users/user.entity").User>;
}
