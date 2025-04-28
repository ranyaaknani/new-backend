import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('admin-only')
  getSecretData() {
    return '🔐 Données réservées à l\'admin';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return '👤 Votre profil';
  }
}
