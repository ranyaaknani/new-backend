import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationsService } from './formations.service';
import { FormationsController } from './formations.controller';
import { Formation } from './entities/formation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formation, ModuleEntity])],
  controllers: [FormationsController],
  providers: [FormationsService],
  exports: [FormationsService],
})
export class FormationsModule {}
