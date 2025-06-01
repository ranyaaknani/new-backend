import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationsService } from './formations.service';
import { FormationsController } from './formations.controller';
import { Formation } from './entities/formation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
import { InvitationEntity } from 'invitation/invitation.entity';
import { Formateur } from 'formateur/formateur.entity';
import { FormateurService } from 'formateur/formateur.service';
import { User } from 'users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Formation,
      ModuleEntity,
      ResourceEntity,
      InvitationEntity,
      Formateur,
      User,
    ]),
  ],
  controllers: [FormationsController],
  providers: [FormationsService, FormateurService],
  exports: [FormationsService],
})
export class FormationsModule {}
