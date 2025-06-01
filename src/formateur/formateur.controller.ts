import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FormateurService } from './formateur.service';
import { CreateFormateurDto } from './dto/create-formateur.dto';
import { UpdateFormateurDto } from './dto/update-formateur.dto';

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

  @Put(':id')
  updateFormateur(
    @Param('id') id: string,
    @Body() updateFormateurDto: UpdateFormateurDto,
  ) {
    return this.formateurService.updateFormateur(id, updateFormateurDto);
  }

  @Delete(':id')
  deleteFormateur(@Param('id') id: string) {
    return this.formateurService.deleteFormateur(id);
  }

  @Get(':id')
  getFormateurById(@Param('id') id: string) {
    return this.formateurService.getFormateurById(id);
  }
}
