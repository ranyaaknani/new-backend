import { Module } from '@nestjs/common';
import { ParticipantsController } from './participant.controller';

@Module({
  controllers: [ParticipantsController],
})
export class ParticipantModule {}
