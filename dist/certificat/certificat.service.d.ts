import { Certificat } from './entities/certificate.entity';
import { Repository } from 'typeorm';
import { User } from 'users/user.entity';
import { CreateCertificateDto } from './dto/create-certification.dto';
import { UpdateCertificateDto } from './dto/update-certification.dto';
import { Formation } from 'formation/entities/formation.entity';
export declare class CertificatService {
    private certificatRepository;
    private userRepository;
    private formationRepository;
    constructor(certificatRepository: Repository<Certificat>, userRepository: Repository<User>, formationRepository: Repository<Formation>);
    create(createCertificateDto: CreateCertificateDto): Promise<Certificat>;
    findAll(): Promise<Certificat[]>;
    findOne(id: string): Promise<Certificat>;
    findByParticipant(participantId: string): Promise<Certificat[]>;
    update(id: string, updateCertificateDto: UpdateCertificateDto): Promise<Certificat>;
    remove(id: string): Promise<void>;
}
