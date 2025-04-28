// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Request as ExpressRequest } from 'express';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new UnauthorizedException('Email ou mot de passe manquant');
    }
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto, @Req() req: ExpressRequest) {
    return this.authService.register(dto);
  }
}
