import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluationTest } from './evaluation_test.entity';
import { Question } from 'question/questions.entity';
import { CreateEvaluationTestDto } from './dto/create-ecaluationTest.dto';
import { UpdateEvaluationTestDto } from './dto/update-ecaluationTest.dto';

@Injectable()
export class EvaluationTestService {
  constructor(
    @InjectRepository(EvaluationTest)
    private evaluationTestRepository: Repository<EvaluationTest>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(
    createEvaluationTestDto: CreateEvaluationTestDto,
  ): Promise<EvaluationTest> {
    const evaluationTest = this.evaluationTestRepository.create({
      isEnabled: createEvaluationTestDto.isEnabled,
      title: createEvaluationTestDto.title,
      timeLimit: createEvaluationTestDto.timeLimit,
      passingScore: createEvaluationTestDto.passingScore,
      description: createEvaluationTestDto.description,
      formationId: createEvaluationTestDto.formationId,
    });

    const savedTest = await this.evaluationTestRepository.save(evaluationTest);

    if (
      createEvaluationTestDto.questions &&
      createEvaluationTestDto.questions.length > 0
    ) {
      const questions = createEvaluationTestDto.questions.map((questionDto) =>
        this.questionRepository.create({
          ...questionDto,
          evaluationTestId: savedTest.id,
        }),
      );

      await this.questionRepository.save(questions);
    }

    return this.findOne(savedTest.id);
  }

  async findAll(): Promise<EvaluationTest[]> {
    return this.evaluationTestRepository.find({
      relations: ['questions'],
      order: {
        createdAt: 'DESC',
        questions: {
          order: 'ASC',
        },
      },
    });
  }

  async findOne(id: string): Promise<EvaluationTest> {
    const evaluationTest = await this.evaluationTestRepository.findOne({
      where: { id },
      relations: ['questions'],
      order: {
        questions: {
          order: 'ASC',
        },
      },
    });

    if (!evaluationTest) {
      throw new NotFoundException(`Evaluation test with ID ${id} not found`);
    }

    return evaluationTest;
  }

  async update(
    id: string,
    updateEvaluationTestDto: UpdateEvaluationTestDto,
  ): Promise<EvaluationTest> {
    const evaluationTest = await this.findOne(id);

    Object.assign(evaluationTest, {
      isEnabled: updateEvaluationTestDto.isEnabled ?? evaluationTest.isEnabled,
      title: updateEvaluationTestDto.title ?? evaluationTest.title,
      timeLimit: updateEvaluationTestDto.timeLimit ?? evaluationTest.timeLimit,
      passingScore:
        updateEvaluationTestDto.passingScore ?? evaluationTest.passingScore,
      description:
        updateEvaluationTestDto.description ?? evaluationTest.description,
      formationId:
        updateEvaluationTestDto.formationId ?? evaluationTest.formationId,
    });

    await this.evaluationTestRepository.save(evaluationTest);

    if (updateEvaluationTestDto.questions) {
      await this.questionRepository.delete({ evaluationTestId: id });

      const questions = updateEvaluationTestDto.questions.map((questionDto) =>
        this.questionRepository.create({
          ...questionDto,
          evaluationTestId: id,
        }),
      );

      await this.questionRepository.save(questions);
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const evaluationTest = await this.findOne(id);
    await this.evaluationTestRepository.remove(evaluationTest);
  }

  async findEnabledTests(): Promise<EvaluationTest[]> {
    return this.evaluationTestRepository.find({
      where: { isEnabled: true },
      relations: ['questions'],
      order: {
        createdAt: 'DESC',
        questions: {
          order: 'ASC',
        },
      },
    });
  }
}
