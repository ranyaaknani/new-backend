// src/auth/auth.controller.ts
import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../common/decorators/public.decorator';
import { Role } from 'common/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      if (!body.email || !body.password) {
        throw new UnauthorizedException('Email and password are required');
      }
      return await this.authService.login(body);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Login failed');
    }
  }

  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    try {
      if (!dto.role) {
        dto.role = Role.Participant;
      }

      const user = await this.authService.register(dto);

      const { ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Registration failed');
    }
  }
}
