// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { FormateurModule } from './formateur/formateur.module';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from 'config/database.config';
import { FormationsModule } from 'formation/formations.module';
import { ModulesModule } from 'modules/modules.module';
import { ResourcesModule } from 'ressource/ressource.module';
import { InvitationsModule } from 'invitation/invitation.module';
import { QuizModule } from 'quiz/quiz.module';
import { ParticipantModule } from 'participant/participant.module';
import { CertificatModule } from 'certificat/certificat.module';
import { NotificationModule } from 'notification/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
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
    FormationsModule,
    ModulesModule,
    ResourcesModule,
    InvitationsModule,
    QuizModule,
    ParticipantModule,
    CertificatModule,
    NotificationModule,
  ],
})
export class AppModule {}
