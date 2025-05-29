import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from './entities/module.entity';
import { Formation } from 'formation/entities/formation.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModuleEntity, Formation, ResourceEntity]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
