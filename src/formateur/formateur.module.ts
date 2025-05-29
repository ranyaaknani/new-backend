import { Module } from '@nestjs/common';
import { FormateurController } from './formateur.controller';
import { FormateurService } from './formateur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { Formateur } from './formateur.entity';
import { ModuleEntity } from 'modules/entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formateur, Formation, ModuleEntity])],
  controllers: [FormateurController],
  providers: [FormateurService],
  exports: [FormateurService],
})
export class FormateurModule {}
