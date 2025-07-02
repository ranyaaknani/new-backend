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
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    findAll(): Promise<Formation[]>;
    findOne(id: string): Promise<Formation>;
    update(id: string, updateFormationDto: UpdateFormationDto): Promise<Formation>;
    remove(id: string): Promise<void>;
    getParticipants(formationId: string): Promise<import("../users/user.entity").User[]>;
    getParticipantsByFormation(formationId: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../common/enums/role.enum").Role;
        status: import("../users/user.entity").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
