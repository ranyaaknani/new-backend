import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Quiz, QuizQuestion } from './entities/quiz.entity';
import { Formation } from 'formation/entities/formation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import {
  CreateQuizDto,
  QuizQueryDto,
  UpdateQuizDto,
} from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizQuestion)
    private questionRepository: Repository<QuizQuestion>,
    @InjectRepository(Formation)
    private formationRepository: Repository<Formation>,
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
    private dataSource: DataSource,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verify formation exists
      const formation = await this.formationRepository.findOne({
        where: { id: createQuizDto.formationId },
      });
      if (!formation) {
        throw new NotFoundException(
          `Formation with ID ${createQuizDto.formationId} not found`,
        );
      }

      // Verify module exists and belongs to formation
      const module = await this.moduleRepository.findOne({
        where: {
          id: createQuizDto.moduleId,
          formationId: createQuizDto.formationId,
        },
      });
      if (!module) {
        throw new NotFoundException(
          `Module with ID ${createQuizDto.moduleId} not found in formation ${createQuizDto.formationId}`,
        );
      }

      // Create quiz
      const quiz = this.quizRepository.create({
        description: createQuizDto.description,
        moduleId: createQuizDto.moduleId,
        formationId: createQuizDto.formationId,
        isActive: createQuizDto.isActive !== false,
        score: createQuizDto.score,
      });

      const savedQuiz = await queryRunner.manager.save(quiz);

      // Create questions if provided
      if (createQuizDto.questions && createQuizDto.questions.length > 0) {
        const questions = createQuizDto.questions.map((questionDto, index) => {
          return this.questionRepository.create({
            question: questionDto.question,
            options: questionDto.options,
            correctAnswer: questionDto.correctAnswer,
            order: questionDto.order ?? index,
            score: questionDto.score,
            quizId: savedQuiz.id,
          });
        });

        await queryRunner.manager.save(QuizQuestion, questions);
      }

      await queryRunner.commitTransaction();
      return this.findOne(savedQuiz.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new ConflictException(`Failed to create quiz: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(queryDto: QuizQueryDto = {}): Promise<{
    data: Quiz[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      moduleId,
      formationId,
      search,
      isActive,
      page = 1,
      limit = 10,
    } = queryDto;

    const queryBuilder = this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('quiz.module', 'module')
      .leftJoinAndSelect('quiz.formation', 'formation')
      .orderBy('quiz.createdAt', 'DESC')
      .addOrderBy('questions.order', 'ASC');

    if (moduleId) {
      queryBuilder.andWhere('quiz.moduleId = :moduleId', { moduleId });
    }

    if (formationId) {
      queryBuilder.andWhere('quiz.formationId = :formationId', { formationId });
    }

    if (search) {
      queryBuilder.andWhere(
        '(quiz.title ILIKE :search OR quiz.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('quiz.isActive = :isActive', { isActive });
    }

    const total = await queryBuilder.getCount();
    const data = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'module', 'formation'],
      order: {
        questions: {
          order: 'ASC',
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return quiz;
  }

  async findByModule(moduleId: string): Promise<Quiz[]> {
    return this.quizRepository.find({
      where: { moduleId, isActive: true },
      relations: ['questions'],
      order: {
        createdAt: 'ASC',
        questions: {
          order: 'ASC',
        },
      },
    });
  }

  async findQuizzesByFormation(formationId: string): Promise<Quiz[]> {
    try {
      const quizzes = await this.quizRepository.find({
        where: {
          formationId,
          isActive: true,
        },
        relations: {
          module: true,
          questions: true,
        },
        order: {
          createdAt: 'DESC',
          questions: {
            order: 'ASC',
          },
        },
      });

      return quizzes;
    } catch (error) {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Failed to fetch quizzes for formation ${formationId}: ${error.message}`,
      );
    }
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const quiz = await this.findOne(id);

      if (updateQuizDto.description !== undefined) {
        quiz.description = updateQuizDto.description;
      }
      if (updateQuizDto.isActive !== undefined) {
        quiz.isActive = updateQuizDto.isActive;
      }

      await queryRunner.manager.save(quiz);

      // Update questions if provided
      if (updateQuizDto.questions) {
        // Delete existing questions
        await queryRunner.manager.delete(QuizQuestion, { quizId: id });

        // Create new questions
        if (updateQuizDto.questions.length > 0) {
          const questions = updateQuizDto.questions.map(
            (questionDto, index) => {
              return this.questionRepository.create({
                question: questionDto.question,
                options: questionDto.options,
                correctAnswer: questionDto.correctAnswer,
                order: questionDto.order ?? index,
                score: questionDto.score,
                quizId: id,
              });
            },
          );

          await queryRunner.manager.save(QuizQuestion, questions);
        }
      }

      await queryRunner.commitTransaction();
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new ConflictException(`Failed to update quiz: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<void> {
    const quiz = await this.findOne(id);
    await this.quizRepository.remove(quiz);
  }

  async toggleActive(id: string): Promise<Quiz> {
    const quiz = await this.findOne(id);
    quiz.isActive = !quiz.isActive;
    await this.quizRepository.save(quiz);
    return quiz;
  }

  async addQuestion(quizId: string, questionData: any): Promise<Quiz> {
    const quiz = await this.findOne(quizId);

    const question = this.questionRepository.create({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      question: questionData.question,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      options: questionData.options,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      correctAnswer: questionData.correctAnswer,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      order: questionData.order ?? quiz.questions.length,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      score: questionData?.score,
      quizId: quizId,
    });

    await this.questionRepository.save(question);
    return this.findOne(quizId);
  }

  async removeQuestion(quizId: string, questionId: string): Promise<Quiz> {
    await this.findOne(quizId); // Verify quiz exists

    const question = await this.questionRepository.findOne({
      where: { id: questionId, quizId },
    });

    if (!question) {
      throw new NotFoundException(
        `Question with ID ${questionId} not found in quiz ${quizId}`,
      );
    }

    await this.questionRepository.remove(question);
    return this.findOne(quizId);
  }

  async updateQuestion(
    quizId: string,
    questionId: string,
    questionData: any,
  ): Promise<Quiz> {
    await this.findOne(quizId); // Verify quiz exists

    const question = await this.questionRepository.findOne({
      where: { id: questionId, quizId },
    });

    if (!question) {
      throw new NotFoundException(
        `Question with ID ${questionId} not found in quiz ${quizId}`,
      );
    }

    Object.assign(question, questionData);
    await this.questionRepository.save(question);
    return this.findOne(quizId);
  }
}
