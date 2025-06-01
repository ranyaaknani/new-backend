import { Repository } from 'typeorm';
import { Formateur } from './formateur.entity';
import { CreateFormateurDto } from './dto/create-formateur.dto';
import { UpdateFormateurDto } from './dto/update-formateur.dto';
export declare class FormateurService {
    private readonly formateurRepository;
    constructor(formateurRepository: Repository<Formateur>);
    createFormateur(createFormateurDto: CreateFormateurDto): Promise<Omit<Formateur, 'password'>>;
    getAllFormateurs(): Promise<Omit<Formateur, 'password'>[]>;
    updateFormateur(id: string, updateFormateurDto: UpdateFormateurDto): Promise<Omit<Formateur, 'password'>>;
    deleteFormateur(id: string): Promise<{
        message: string;
    }>;
    getFormateurById(id: string): Promise<Omit<Formateur, 'password'>>;
}
