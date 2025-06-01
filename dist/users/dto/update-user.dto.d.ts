import { Role } from 'common/enums/role.enum';
import { UserStatus } from 'users/user.entity';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    name?: string;
    telephone?: string;
    role?: Role;
    status?: UserStatus;
    hasCertificate?: boolean;
}
