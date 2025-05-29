import { Repository } from 'typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { ModuleEntity } from 'formation/entities/module.entity';
import { Formateur } from './formateur.entity';
import { CreateFormateurDto } from './dto/create-formateur.dto';
export declare class FormateurService {
    private readonly formateurRepository;
    private readonly formationRepository;
    private readonly moduleRepository;
    constructor(formateurRepository: Repository<Formateur>, formationRepository: Repository<Formation>, moduleRepository: Repository<ModuleEntity>);
    createFormateur(createFormateurDto: CreateFormateurDto): Promise<Omit<Formateur, 'password'>>;
    getAllFormateurs(): Promise<Omit<Formateur, 'password'>[]>;
}
