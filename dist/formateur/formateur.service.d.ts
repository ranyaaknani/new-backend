import { Formation } from '../formation/formation.entity';
import { Repository } from 'typeorm';
export declare class FormateurService {
    private formationRepository;
    constructor(formationRepository: Repository<Formation>);
    getFormations(formateurId: number): Promise<Formation[]>;
    addFormation(formateurId: number, data: any): Promise<Formation[]>;
}
