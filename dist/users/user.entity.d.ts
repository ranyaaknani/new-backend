import { Role } from '../common/enums/role.enum';
import { Formation } from 'formation/entities/formation.entity';
import { Certificat } from 'certificat/entities/certificate.entity';
export declare enum UserStatus {
    Active = "active",
    Inactive = "inactive",
    Suspended = "suspended"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    telephone?: string;
    role: Role;
    status: UserStatus;
    hasCertificate: boolean;
    createdAt: Date;
    updatedAt: Date;
    formations: Formation[];
    createdFormations: Formation[];
    certificatsObtenus: Certificat[];
}
