export declare class CreateInvitationDto {
    mode: string;
    emails: string[];
    linkGenerated?: boolean;
    invitationLink?: string;
    csvImage?: string;
    validFrom?: Date;
    validTo?: Date;
    formationId: string;
}
