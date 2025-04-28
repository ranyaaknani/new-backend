import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsService } from './participant.service';
import { Participant } from './participant.entity';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  findAll(): Promise<Participant[]> {
    return this.participantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Participant> {
    return this.participantsService.findOne(id);
  }
}
