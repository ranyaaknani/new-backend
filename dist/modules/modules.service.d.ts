import { ModuleEntity } from './entities/module.entity';
import { DataSource, Repository } from 'typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
export declare class ModulesService {
    private modulesRepository;
    private formationsRepository;
    private resourcesRepository;
    private dataSource;
    constructor(modulesRepository: Repository<ModuleEntity>, formationsRepository: Repository<Formation>, resourcesRepository: Repository<ResourceEntity>, dataSource: DataSource);
    create(createModuleDto: CreateModuleDto): Promise<ModuleEntity>;
    findAll(): Promise<ModuleEntity[]>;
    findOne(id: string): Promise<ModuleEntity>;
    update(id: string, updateModuleDto: UpdateModuleDto): Promise<ModuleEntity>;
    remove(id: string): Promise<void>;
}
