import { DataSource, Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
import { InvitationEntity } from 'invitation/invitation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formateur } from 'formateur/formateur.entity';
import { User } from 'users/user.entity';
export declare class FormationsService {
    private formationsRepository;
    private formateurRepository;
    private modulesRepository;
    private invitationsRepository;
    private resourcesRepository;
    private userRepository;
    private dataSource;
    constructor(formationsRepository: Repository<Formation>, formateurRepository: Repository<Formateur>, modulesRepository: Repository<ModuleEntity>, invitationsRepository: Repository<InvitationEntity>, resourcesRepository: Repository<ResourceEntity>, userRepository: Repository<User>, dataSource: DataSource);
    create(createFormationDto: CreateFormationDto): Promise<Formation>;
    findAll(): Promise<Formation[]>;
    findOne(id: string): Promise<Formation>;
    update(id: string, updateFormationDto: UpdateFormationDto): Promise<Formation>;
    remove(id: string): Promise<void>;
    findByFormateur(formateurId: string): Promise<Formation[]>;
    findPublicFormations(): Promise<Formation[]>;
}
