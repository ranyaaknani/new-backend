import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../common/enums/role.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminController {
  @Get('dashboard')
  getAdminDashboard() {
    return {
      message: '👑 Accès admin autorisé',
      stats: {
        formations: 24,
        participants: 320,
        formateurs: 8,
      },
    };
  }

  @Get('users')
  getAllUsers() {
    return ['admin@example.com', 'formateur@example.com', 'participant@example.com'];
  }
}
