import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsService } from './participant.service';
import { Participant } from './entities/participant.entity';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post('add')
  create(
    @Body() createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  findAll(): Promise<Participant[]> {
    return this.participantsService.findAll();
  }

  @Get('statistics')
  getStatistics() {
    return this.participantsService.getStatistics();
  }

  @Get('formateur/:formateurId')
  findByFormateur(
    @Param('formateurId') formateurId: string,
  ): Promise<Participant[]> {
    return this.participantsService.findByFormateur(formateurId);
  }

  @Get('formation/:formationId')
  findByFormation(
    @Param('formationId') formationId: string,
  ): Promise<Participant[]> {
    return this.participantsService.findByFormation(formationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Participant> {
    return this.participantsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Participant> {
    return this.participantsService.updateStatus(id, status);
  }

  @Patch(':id/toggle-active')
  toggleActive(@Param('id') id: string): Promise<Participant> {
    return this.participantsService.toggleActive(id);
  }

  @Post(':id/certificate')
  generateCertificate(@Param('id') id: string): Promise<Participant> {
    return this.participantsService.generateCertificate(id);
  }

  @Post(':id/email-reminder')
  sendEmailReminder(@Param('id') id: string) {
    return this.participantsService.sendEmailReminder(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.participantsService.remove(id);
  }
}
