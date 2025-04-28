import { Repository } from 'typeorm';
import { Formation } from './formation.entity';
import { CreateFormationDto } from './dto/create-formation.dto';
export declare class FormationsService {
    private formationsRepository;
    constructor(formationsRepository: Repository<Formation>);
    create(createFormationDto: CreateFormationDto): Promise<Formation>;
    findAll(): Promise<Formation[]>;
    findOne(id: string): Promise<Formation>;
}
