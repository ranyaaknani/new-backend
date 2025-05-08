import { Repository } from 'typeorm';
import { Formation } from 'formation/entities/formation.entity';
export declare class FormateurService {
    private formationRepository;
    constructor(formationRepository: Repository<Formation>);
    getFormations(formateurId: string): Promise<Formation[]>;
    addFormation(formateurId: string, data: any): Promise<Formation[]>;
}
