import { Controller, Get, Post, Body } from '@nestjs/common';
import { FormateurService } from './formateur.service';
import { CreateFormateurDto } from './dto/create-formateur.dto';

@Controller('formateur')
export class FormateurController {
  constructor(private readonly formateurService: FormateurService) {}

  @Post('add')
  createFormateur(@Body() createFormateurDto: CreateFormateurDto) {
    return this.formateurService.createFormateur(createFormateurDto);
  }

  @Get()
  getAllFormateurs() {
    return this.formateurService.getAllFormateurs();
  }
}
