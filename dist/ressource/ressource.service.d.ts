import { ResourceEntity } from './entities/ressource.entity';
import { DataSource, Repository } from 'typeorm';
import { ModuleEntity } from 'modules/entities/module.entity';
import { CreateResourceDto } from './dto/create-ressource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
export declare class ResourcesService {
    private resourcesRepository;
    private modulesRepository;
    private dataSource;
    constructor(resourcesRepository: Repository<ResourceEntity>, modulesRepository: Repository<ModuleEntity>, dataSource: DataSource);
    create(createResourceDto: CreateResourceDto): Promise<ResourceEntity>;
    findAll(): Promise<ResourceEntity[]>;
    findOne(id: string): Promise<ResourceEntity>;
    update(id: string, updateResourceDto: UpdateResourceDto): Promise<ResourceEntity>;
    remove(id: string): Promise<void>;
}
