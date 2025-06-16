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
        id: string;
        email: string;
        password: string;
        name: string;
        telephone?: string;
        role: Role;
        status: import("../users/user.entity").UserStatus;
        hasCertificate: boolean;
        createdAt: Date;
        updatedAt: Date;
        formations: import("../formation/entities/formation.entity").Formation[];
        createdFormations: import("../formation/entities/formation.entity").Formation[];
        certificatsObtenus: import("../certificat/entities/certificate.entity").Certificat[];
    }>;
}
