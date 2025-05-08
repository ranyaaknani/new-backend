import { Module } from '@nestjs/common';
import { FormateurController } from './formateur.controller';
import { FormateurService } from './formateur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formation } from 'formation/entities/formation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formation])],
  controllers: [FormateurController],
  providers: [FormateurService],
})
export class FormateurModule {}
