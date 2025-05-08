// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { FormateurModule } from './formateur/formateur.module';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from 'config/database.config';

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

    UsersModule,
    AuthModule,
    AdminModule,
    FormateurModule,
  ],
})
export class AppModule {}
