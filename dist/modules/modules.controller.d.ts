import { ModuleEntity } from './entities/module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModulesService } from './modules.service';
export declare class ModulesController {
    private readonly modulesService;
    constructor(modulesService: ModulesService);
    create(createModuleDto: CreateModuleDto): Promise<{
        success: boolean;
        message: string;
        data: ModuleEntity;
    }>;
    findAll(): Promise<ModuleEntity[]>;
    findOne(id: string): Promise<ModuleEntity>;
    update(id: string, updateModuleDto: UpdateModuleDto): Promise<ModuleEntity>;
    remove(id: string): Promise<void>;
}
