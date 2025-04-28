export declare class AdminController {
    getAdminDashboard(): {
        message: string;
        stats: {
            formations: number;
            participants: number;
            formateurs: number;
        };
    };
    getAllUsers(): string[];
}
