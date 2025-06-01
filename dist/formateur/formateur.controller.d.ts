import { FormateurService } from './formateur.service';
import { CreateFormateurDto } from './dto/create-formateur.dto';
import { UpdateFormateurDto } from './dto/update-formateur.dto';
export declare class FormateurController {
    private readonly formateurService;
    constructor(formateurService: FormateurService);
    createFormateur(createFormateurDto: CreateFormateurDto): Promise<Omit<import("./formateur.entity").Formateur, "password">>;
    getAllFormateurs(): Promise<Omit<import("./formateur.entity").Formateur, "password">[]>;
    updateFormateur(id: string, updateFormateurDto: UpdateFormateurDto): Promise<Omit<import("./formateur.entity").Formateur, "password">>;
    deleteFormateur(id: string): Promise<{
        message: string;
    }>;
    getFormateurById(id: string): Promise<Omit<import("./formateur.entity").Formateur, "password">>;
}
