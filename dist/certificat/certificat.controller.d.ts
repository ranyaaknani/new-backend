import { CertificatService } from './certificat.service';
import { CreateCertificateDto } from './dto/create-certification.dto';
import { UpdateCertificateDto } from './dto/update-certification.dto';
import { Response } from 'express';
export declare class CertificatController {
    private readonly certificatService;
    constructor(certificatService: CertificatService);
    create(createCertificateDto: CreateCertificateDto): Promise<import("./entities/certificate.entity").Certificat>;
    serveCertificatePdf(filename: string, res: Response): void;
    findAll(participantId?: string): Promise<import("./entities/certificate.entity").Certificat[]>;
    findOne(id: string): Promise<import("./entities/certificate.entity").Certificat>;
    update(id: string, updateCertificateDto: UpdateCertificateDto): Promise<import("./entities/certificate.entity").Certificat>;
    remove(id: string): Promise<void>;
    generateCertificate(body: {
        participantId: string;
        formationId: string;
        participantName: string;
        formationName: string;
    }): Promise<import("./entities/certificate.entity").Certificat>;
    getCertificatesByUser(userId: string): Promise<import("./entities/certificate.entity").Certificat[]>;
}
