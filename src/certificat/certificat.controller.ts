import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CertificatService } from './certificat.service';
import { CreateCertificateDto } from './dto/create-certification.dto';
import { UpdateCertificateDto } from './dto/update-certification.dto';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('certificats')
export class CertificatController {
  constructor(private readonly certificatService: CertificatService) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatService.create(createCertificateDto);
  }

  @Get(':filename')
  serveCertificatePdf(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      const filePath = path.join(
        process.cwd(),
        'uploads',
        'certificates',
        filename,
      );

      if (!fs.existsSync(filePath)) {
        throw new NotFoundException('Certificate PDF not found');
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Certificate PDF not found');
    }
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

  @Get('user/:userId')
  async getCertificatesByUser(@Param('userId') userId: string) {
    try {
      const certificates = await this.certificatService.findByUserId(userId);
      return certificates;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Failed to fetch user certificates');
    }
  }
}
