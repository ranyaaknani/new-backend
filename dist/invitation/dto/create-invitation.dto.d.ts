export declare class CreateInvitationDto {
    mode: string;
    emails?: string[];
    fromEmails?: string[];
    toEmails?: string[];
    invitationLink?: string;
    linkGenerated?: boolean;
    csvFile?: any;
    csvImage?: string;
    subject?: string;
    message?: string;
    expiresAt?: string;
    isActive?: boolean;
    formationId: string;
}
