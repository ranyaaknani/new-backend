import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from './entities/ressource.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import { ResourcesController } from './ressource.controller';
import { ResourcesService } from './ressource.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceEntity, ModuleEntity])],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule {}
