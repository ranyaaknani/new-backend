import { CreateResourceDto } from './dto/create-ressource.dto';
import { ResourceEntity } from './entities/ressource.entity';
import { ResourcesService } from './ressource.service';
import { UpdateResourceDto } from './dto/update-resource.dto';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    create(createResourceDto: CreateResourceDto): Promise<{
        success: boolean;
        message: string;
        data: ResourceEntity;
    }>;
    findAll(): Promise<ResourceEntity[]>;
    findOne(id: string): Promise<ResourceEntity>;
    update(id: string, updateResourceDto: UpdateResourceDto): Promise<ResourceEntity>;
    remove(id: string): Promise<void>;
}
