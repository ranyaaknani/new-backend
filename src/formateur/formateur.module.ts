import { Module } from '@nestjs/common';
import { FormateurController } from './formateur.controller';
import { FormateurService } from './formateur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { ModuleEntity } from 'formation/entities/module.entity';
import { Formateur } from './formateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formation, ModuleEntity, Formateur])],
  controllers: [FormateurController],
  providers: [FormateurService],
  exports: [FormateurService],
})
export class FormateurModule {}
