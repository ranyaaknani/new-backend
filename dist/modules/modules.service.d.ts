import { ModuleEntity } from './entities/module.entity';
import { DataSource, Repository } from 'typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
import { ResourcesService } from 'ressource/ressource.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
export declare class ModulesService {
    private modulesRepository;
    private formationsRepository;
    private resourcesRepository;
    private resourcesService;
    private dataSource;
    constructor(modulesRepository: Repository<ModuleEntity>, formationsRepository: Repository<Formation>, resourcesRepository: Repository<ResourceEntity>, resourcesService: ResourcesService, dataSource: DataSource);
    create(createModuleDto: CreateModuleDto): Promise<ModuleEntity>;
    findAll(): Promise<ModuleEntity[]>;
    findOne(id: string): Promise<ModuleEntity>;
    update(id: string, updateModuleDto: UpdateModuleDto): Promise<ModuleEntity>;
    remove(id: string): Promise<void>;
}
