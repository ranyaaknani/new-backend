import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationEntity } from './invitation.entity';
import { Formation } from 'formation/entities/formation.entity';
import { InvitationsController } from './invitation.controller';
import { InvitationsService } from './invitation.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvitationEntity, Formation])],
  controllers: [InvitationsController],
  providers: [InvitationsService],
  exports: [InvitationsService],
})
export class InvitationsModule {}
