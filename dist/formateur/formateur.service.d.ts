import { Repository } from 'typeorm';
import { Formateur } from './formateur.entity';
import { CreateFormateurDto } from './dto/create-formateur.dto';
export declare class FormateurService {
    private readonly formateurRepository;
    constructor(formateurRepository: Repository<Formateur>);
    createFormateur(createFormateurDto: CreateFormateurDto): Promise<Omit<Formateur, 'password'>>;
    getAllFormateurs(): Promise<Omit<Formateur, 'password'>[]>;
}
