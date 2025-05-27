import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationsService } from './formations.service';
import { FormationsController } from './formations.controller';
import { Formation } from './entities/formation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
import { InvitationEntity } from 'invitation/invitation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Formation,
      ModuleEntity,
      ResourceEntity,
      InvitationEntity,
    ]),
  ],
  controllers: [FormationsController],
  providers: [FormationsService],
  exports: [FormationsService],
})
export class FormationsModule {}
