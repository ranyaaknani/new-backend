import { Role } from '../../common/enums/role.enum';
import { UserStatus } from 'users/user.entity';
export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    telephone?: string;
    role?: Role;
    status?: UserStatus;
    linkedInLink?: string;
    cv?: string;
    isAccepted?: boolean;
    hasCertificate?: boolean;
}
