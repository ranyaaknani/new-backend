import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CertificatService } from './certificat.service';
import { CreateCertificateDto } from './dto/create-certification.dto';
import { UpdateCertificateDto } from './dto/update-certification.dto';

@Controller('certificats')
export class CertificatController {
  constructor(private readonly certificatService: CertificatService) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatService.create(createCertificateDto);
  }

  @Get()
  findAll(@Query('participantId') participantId?: string) {
    if (participantId) {
      return this.certificatService.findByParticipant(participantId);
    }
    return this.certificatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificatService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    return this.certificatService.update(id, updateCertificateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.certificatService.remove(id);
  }

  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  async generateCertificate(
    @Body()
    body: {
      participantId: string;
      formationId: string;
      participantName: string;
      formationName: string;
    },
  ) {
    const createCertificateDto: CreateCertificateDto = {
      nomParticipant: body.participantName,
      formation: body.formationName,
      participantId: body.participantId,
      formationId: body.formationId,
    };

    return this.certificatService.create(createCertificateDto);
  }
}
