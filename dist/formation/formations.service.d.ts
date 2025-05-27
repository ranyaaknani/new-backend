import { Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';
import { ModuleEntity } from './entities/module.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
import { InvitationEntity } from 'invitation/invitation.entity';
export declare class FormationsService {
    private formationsRepository;
    private modulesRepository;
    private resourcesRepository;
    private invitationsRepository;
    constructor(formationsRepository: Repository<Formation>, modulesRepository: Repository<ModuleEntity>, resourcesRepository: Repository<ResourceEntity>, invitationsRepository: Repository<InvitationEntity>);
    create(createFormationDto: CreateFormationDto): Promise<Formation>;
    findAll(): Promise<Formation[]>;
    findOne(id: string): Promise<Formation>;
    update(id: string, updateFormationDto: Partial<CreateFormationDto>): Promise<Formation>;
    remove(id: string): Promise<void>;
    findByFormateur(formateurId: string): Promise<Formation[]>;
    findPublicFormations(): Promise<Formation[]>;
}
