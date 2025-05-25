import { Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';
import { ModuleEntity } from './entities/module.entity';
export declare class FormationsService {
    private formationsRepository;
    private modulesRepository;
    constructor(formationsRepository: Repository<Formation>, modulesRepository: Repository<ModuleEntity>);
    create(createFormationDto: CreateFormationDto): Promise<Formation>;
    findAll(): Promise<Formation[]>;
    findOne(id: string): Promise<Formation>;
    update(id: string, updateData: Partial<CreateFormationDto>): Promise<Formation>;
    remove(id: string): Promise<void>;
}
