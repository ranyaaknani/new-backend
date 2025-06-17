export declare class NotificationResponseDto {
    id: string;
    title: string;
    body: string;
    type?: string;
    metadata?: any;
    createdAt: Date;
    updatedAt: Date;
    isRead?: boolean;
    readAt?: Date;
    totalRecipients?: number;
    readCount?: number;
}
