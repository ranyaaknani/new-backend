import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from 'common/enums/role.enum';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(dto: CreateUserDto): Promise<{
        [x: string]: any;
        id: string;
        email: string;
        password: string;
        name: string;
        role: Role;
    }>;
}
