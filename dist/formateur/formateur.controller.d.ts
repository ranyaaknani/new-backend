import { FormateurService } from './formateur.service';
export declare class FormateurController {
    private readonly formateurService;
    constructor(formateurService: FormateurService);
    getFormations(req: any): Promise<import("../formation/entities/formation.entity").Formation[]>;
    addFormation(body: any, req: any): Promise<import("../formation/entities/formation.entity").Formation[]>;
}
