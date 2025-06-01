import { Module } from '@nestjs/common';
import { ParticipantsController } from './participant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { Formation } from 'formation/entities/formation.entity';
import { ParticipantsService } from './participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant, Formation])],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService],
})
export class ParticipantModule {}
