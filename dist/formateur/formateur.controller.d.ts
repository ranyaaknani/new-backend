import { FormateurService } from './formateur.service';
import { CreateFormationDto } from 'formation/dto/create-formation.dto';
import { CreateFormateurDto } from './dto/create-formateur.dto';
interface AuthenticatedRequest extends Request {
    user: {
        id: string;
    };
}
export declare class FormateurController {
    private readonly formateurService;
    constructor(formateurService: FormateurService);
    createFormateur(createFormateurDto: CreateFormateurDto): Promise<Omit<import("./formateur.entity").Formateur, "password">>;
    getFormations(req: AuthenticatedRequest): Promise<import("../formation/entities/formation.entity").Formation[]>;
    addFormation(createFormationDto: CreateFormationDto, req: AuthenticatedRequest): Promise<import("../formation/entities/formation.entity").Formation>;
    getAllFormateurs(): Promise<Omit<import("./formateur.entity").Formateur, "password">[]>;
}
export {};
