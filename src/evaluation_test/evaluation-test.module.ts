import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationTest } from './evaluation_test.entity';
import { Question } from 'question/questions.entity';
import { EvaluationTestController } from './evaluation-test.controller';
import { EvaluationTestService } from './evaluation-test.service';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationTest, Question])],
  controllers: [EvaluationTestController],
  providers: [EvaluationTestService],
  exports: [EvaluationTestService],
})
export class EvaluationTestModule {}
