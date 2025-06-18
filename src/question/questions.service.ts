import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question, QuestionType } from './questions.entity';
import { Repository } from 'typeorm';
import { Formation } from 'formation/entities/formation.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Formation)
    private readonly formationRepository: Repository<Formation>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const formation = await this.formationRepository.findOne({
      where: { id: createQuestionDto.formationId },
    });

    if (!formation) {
      throw new NotFoundException('Formation not found');
    }

    this.validateQuestionData(createQuestionDto);

    if (createQuestionDto.order === undefined) {
      const questionCount = await this.questionRepository.count({
        where: { formationId: createQuestionDto.formationId },
      });
      createQuestionDto.order = questionCount;
    }

    const question = this.questionRepository.create(createQuestionDto);
    return await this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByFormation(formationId: string): Promise<Question[]> {
    const formation = await this.formationRepository.findOne({
      where: { id: formationId },
    });

    if (!formation) {
      throw new NotFoundException('Formation not found');
    }

    return await this.questionRepository.find({
      where: { formationId },
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  async findByFormationWithAnswers(formationId: string): Promise<Question[]> {
    const formation = await this.formationRepository.findOne({
      where: { id: formationId },
    });

    if (!formation) {
      throw new NotFoundException('Formation not found');
    }

    return await this.questionRepository.find({
      where: { formationId },
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['formation'],
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question;
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['formation'],
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    // Create merged data for validation
    const mergedData: CreateQuestionDto = {
      type: updateQuestionDto.type ?? question.type,
      question: updateQuestionDto.question ?? question.question,
      options: updateQuestionDto.options ?? question.options ?? undefined,
      correctAnswer: updateQuestionDto.correctAnswer ?? question.correctAnswer,
      points: updateQuestionDto.points ?? question.points,
      explanation:
        updateQuestionDto.explanation ?? question.explanation ?? undefined,
      order: updateQuestionDto.order ?? question.order,
      formationId: question.formationId,
    };

    this.validateQuestionData(mergedData);

    Object.assign(question, updateQuestionDto);
    return await this.questionRepository.save(question);
  }

  async remove(id: string): Promise<void> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['formation'],
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    await this.questionRepository.remove(question);
  }

  async reorderQuestions(
    formationId: string,
    questionIds: string[],
  ): Promise<Question[]> {
    const formation = await this.formationRepository.findOne({
      where: { id: formationId },
    });

    if (!formation) {
      throw new NotFoundException('Formation not found');
    }

    const updatePromises = questionIds.map((questionId, index) =>
      this.questionRepository.update(
        { id: questionId, formationId },
        { order: index },
      ),
    );

    await Promise.all(updatePromises);

    return await this.findByFormation(formationId);
  }

  async bulkCreate(questions: CreateQuestionDto[]): Promise<Question[]> {
    if (questions.length === 0) {
      return [];
    }

    const formationId = questions[0].formationId;
    if (!questions.every((q) => q.formationId === formationId)) {
      throw new BadRequestException(
        'All questions must belong to the same formation',
      );
    }

    const formation = await this.formationRepository.findOne({
      where: { id: formationId },
    });

    if (!formation) {
      throw new NotFoundException('Formation not found');
    }

    questions.forEach((questionDto) => this.validateQuestionData(questionDto));

    const currentCount = await this.questionRepository.count({
      where: { formationId },
    });

    questions.forEach((questionDto, index) => {
      if (questionDto.order === undefined) {
        questionDto.order = currentCount + index;
      }
    });

    const createdQuestions = this.questionRepository.create(questions);
    return await this.questionRepository.save(createdQuestions);
  }

  private validateQuestionData(questionData: CreateQuestionDto): void {
    if (questionData.type === QuestionType.MULTIPLE_CHOICE) {
      if (!questionData.options || questionData.options.length < 2) {
        throw new BadRequestException(
          'Multiple choice questions must have at least 2 options',
        );
      }

      const correctAnswerIndex = parseInt(questionData.correctAnswer, 10);
      if (
        isNaN(correctAnswerIndex) ||
        correctAnswerIndex < 0 ||
        correctAnswerIndex >= questionData.options.length
      ) {
        throw new BadRequestException(
          'Correct answer must be a valid option index for multiple choice questions',
        );
      }
    }

    if (questionData.type === QuestionType.TRUE_FALSE) {
      if (!['true', 'false'].includes(questionData.correctAnswer)) {
        throw new BadRequestException(
          'True/False questions must have "true" or "false" as correct answer',
        );
      }
    }

    if (questionData.type === QuestionType.SHORT_ANSWER) {
      if (
        !questionData.correctAnswer ||
        questionData.correctAnswer.trim().length === 0
      ) {
        throw new BadRequestException(
          'Short answer questions must have a correct answer',
        );
      }
    }
  }
}
