import { FormateurService } from './formateur.service';
import { CreateFormateurDto } from './dto/create-formateur.dto';
export declare class FormateurController {
    private readonly formateurService;
    constructor(formateurService: FormateurService);
    createFormateur(createFormateurDto: CreateFormateurDto): Promise<Omit<import("./formateur.entity").Formateur, "password">>;
    getAllFormateurs(): Promise<Omit<import("./formateur.entity").Formateur, "password">[]>;
}
