import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Request as ExpressRequest } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(dto: CreateUserDto, req: ExpressRequest): Promise<import("../users/user.entity").User>;
}
