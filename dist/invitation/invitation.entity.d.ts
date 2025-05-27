import { Formation } from 'formation/entities/formation.entity';
export declare class InvitationEntity {
    id: string;
    mode: string;
    emails?: string[];
    fromEmails?: string[];
    toEmails?: string[];
    invitationLink?: string;
    linkGenerated: boolean;
    csvFile?: string;
    csvImage?: string;
    subject?: string;
    message?: string;
    expiresAt?: Date;
    isActive: boolean;
    formation: Formation;
    formationId: string;
    createdAt: Date;
    updatedAt: Date;
}
