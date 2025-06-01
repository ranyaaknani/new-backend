import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificat } from './entities/certificate.entity';
import { User } from 'users/user.entity';
import { CertificatController } from './certificat.controller';
import { CertificatService } from './certificat.service';
import { Formation } from 'formation/entities/formation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificat, User, Formation])],
  controllers: [CertificatController],
  providers: [CertificatService],
  exports: [CertificatService],
})
export class CertificatModule {}
