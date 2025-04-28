import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FormateurService } from './formateur.service';

@Controller('formateur')
export class FormateurController {
  constructor(private readonly formateurService: FormateurService) {}

  @UseGuards(JwtAuthGuard)
  @Get('formations')
  async getFormations(@Req() req) {
    const formateurId = req.user.id;
    return this.formateurService.getFormations(formateurId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('formations')
  async addFormation(@Body() body: any, @Req() req) {
    const formateurId = req.user.id;
    return this.formateurService.addFormation(formateurId, body);
  }
}
