import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz, QuizQuestion } from './entities/quiz.entity';
import { Formation } from 'formation/entities/formation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, QuizQuestion, Formation, ModuleEntity]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
