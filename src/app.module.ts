// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from 'config/database.config';

// Controllers
import { AdminController } from './admin/admin.controller';
import { FormateurController } from './formateur/formateur.controller';
import { ParticipantsController } from './participant/participant.controller';
import { UsersController } from './users/users.controller'; // N'oublie pas ce controller
import { FormateurModule } from 'formateur/formateur.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get('database')!,
    }),

    // Fonctionnalités
    UsersModule,
    AuthModule,
    AdminModule,
    FormateurModule,
  ],

  controllers: [
    AdminController,
    ParticipantsController,
    UsersController,
     // ✅ Rajouté manuellement ici
  ],
})
export class AppModule {}
