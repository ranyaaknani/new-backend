import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import {
  QuestionAdminResponseDto,
  QuestionResponseDto,
} from './dto/question-response.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { plainToClass } from 'class-transformer';
import { UpdateQuestionDto } from './dto/update-question.dto';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({
    status: 201,
    description: 'Question created successfully',
    type: QuestionAdminResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Formation not found' })
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<QuestionAdminResponseDto> {
    const question = await this.questionsService.create(createQuestionDto);
    return plainToClass(QuestionAdminResponseDto, question, {
      excludeExtraneousValues: true,
    });
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Create multiple questions at once' })
  @ApiResponse({
    status: 201,
    description: 'Questions created successfully',
    type: [QuestionAdminResponseDto],
  })
  async bulkCreate(
    @Body() createQuestionsDto: CreateQuestionDto[],
  ): Promise<QuestionAdminResponseDto[]> {
    const questions =
      await this.questionsService.bulkCreate(createQuestionsDto);
    return plainToClass(QuestionAdminResponseDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: 200,
    description: 'Questions retrieved successfully',
    type: [QuestionAdminResponseDto],
  })
  async findAll(): Promise<QuestionAdminResponseDto[]> {
    const questions = await this.questionsService.findAll();
    return plainToClass(QuestionAdminResponseDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  @Get('formation/:formationId')
  @ApiOperation({ summary: 'Get questions by formation' })
  @ApiParam({ name: 'formationId', description: 'Formation ID' })
  @ApiQuery({
    name: 'includeAnswers',
    required: false,
    description: 'Include correct answers',
  })
  @ApiResponse({
    status: 200,
    description: 'Questions retrieved successfully',
  })
  async findByFormation(
    @Param('formationId', ParseUUIDPipe) formationId: string,
    @Query('includeAnswers') includeAnswers: string,
  ): Promise<QuestionResponseDto[] | QuestionAdminResponseDto[]> {
    const shouldIncludeAnswers = includeAnswers === 'true';

    if (shouldIncludeAnswers) {
      const questions =
        await this.questionsService.findByFormationWithAnswers(formationId);
      return plainToClass(QuestionAdminResponseDto, questions, {
        excludeExtraneousValues: true,
      });
    } else {
      const questions =
        await this.questionsService.findByFormation(formationId);
      return plainToClass(QuestionResponseDto, questions, {
        excludeExtraneousValues: true,
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific question' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'Question retrieved successfully',
    type: QuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<QuestionResponseDto> {
    const question = await this.questionsService.findOne(id);
    return plainToClass(QuestionResponseDto, question, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a question' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'Question updated successfully',
    type: QuestionAdminResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionAdminResponseDto> {
    const question = await this.questionsService.update(id, updateQuestionDto);
    return plainToClass(QuestionAdminResponseDto, question, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a question' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @ApiResponse({ status: 204, description: 'Question deleted successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.questionsService.remove(id);
  }

  @Post('formation/:formationId/reorder')
  @ApiOperation({ summary: 'Reorder questions in a formation' })
  @ApiParam({ name: 'formationId', description: 'Formation ID' })
  @ApiResponse({
    status: 200,
    description: 'Questions reordered successfully',
    type: [QuestionAdminResponseDto],
  })
  async reorderQuestions(
    @Param('formationId', ParseUUIDPipe) formationId: string,
    @Body() body: { questionIds: string[] },
  ): Promise<QuestionAdminResponseDto[]> {
    const questions = await this.questionsService.reorderQuestions(
      formationId,
      body.questionIds,
    );
    return plainToClass(QuestionAdminResponseDto, questions, {
      excludeExtraneousValues: true,
    });
  }
}
