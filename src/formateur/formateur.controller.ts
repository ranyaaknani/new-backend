import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { FormateurService } from './formateur.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { CreateFormationDto } from 'formation/dto/create-formation.dto';
import { CreateFormateurDto } from './dto/create-formateur.dto';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    // Add other user properties as needed
  };
}

@Controller('formateur')
export class FormateurController {
  constructor(private readonly formateurService: FormateurService) {}

  @Post('add')
  createFormateur(@Body() createFormateurDto: CreateFormateurDto) {
    return this.formateurService.createFormateur(createFormateurDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('formations')
  async getFormations(@Req() req: AuthenticatedRequest) {
    const formateurId = req.user.id;
    return this.formateurService.getFormations(formateurId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('formations')
  async addFormation(
    @Body() createFormationDto: CreateFormationDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const formateurId = req.user.id;
    return this.formateurService.addFormation(formateurId, createFormationDto);
  }

  @Get()
  getAllFormateurs() {
    return this.formateurService.getAllFormateurs();
  }
}
