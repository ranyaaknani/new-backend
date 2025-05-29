import { FormationsService } from './formations.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';
import { UpdateFormationDto } from './dto/update-formation.dto';
export declare class FormationsController {
    private readonly formationsService;
    constructor(formationsService: FormationsService);
    create(createFormationDto: CreateFormationDto): Promise<{
        success: boolean;
        message: string;
        data: Formation;
    }>;
    findAll(): Promise<Formation[]>;
    findOne(id: string): Promise<Formation>;
    update(id: string, updateFormationDto: UpdateFormationDto): Promise<Formation>;
    remove(id: string): Promise<void>;
}
