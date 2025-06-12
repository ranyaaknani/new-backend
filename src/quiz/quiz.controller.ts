import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import {
  CreateQuizDto,
  QuizQueryDto,
  UpdateQuizDto,
} from './dto/create-quiz.dto';
import { Quiz } from './entities/quiz.entity';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('add')
  async create(@Body() createQuizDto: CreateQuizDto): Promise<{
    success: boolean;
    message: string;
    data: Quiz;
  }> {
    try {
      const quiz = await this.quizService.create(createQuizDto);
      return {
        success: true,
        message: 'Quiz created successfully',
        data: quiz,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to create quiz',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(@Query() queryDto: QuizQueryDto): Promise<{
    success: boolean;
    message: string;
    data: Quiz[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    try {
      const result = await this.quizService.findAll(queryDto);
      return {
        success: true,
        message: 'Quizzes retrieved successfully',
        data: result.data,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: Math.ceil(result.total / result.limit),
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve quizzes',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('module/:moduleId')
  async findByModule(
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
  ): Promise<{
    success: boolean;
    message: string;
    data: Quiz[];
  }> {
    try {
      const quizzes = await this.quizService.findByModule(moduleId);
      return {
        success: true,
        message: 'Module quizzes retrieved successfully',
        data: quizzes,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve module quizzes',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('formation/:formationId')
  async getQuizzesByFormation(
    @Param('formationId', ParseUUIDPipe) formationId: string,
  ) {
    try {
      const quizzes =
        await this.quizService.findQuizzesByFormation(formationId);

      return {
        success: true,
        message: 'Quizzes retrieved successfully',
        data: quizzes,
        count: quizzes.length,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          message: error.message || 'Failed to fetch quizzes',
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<{
    success: boolean;
    message: string;
    data: Quiz;
  }> {
    try {
      const quiz = await this.quizService.findOne(id);
      return {
        success: true,
        message: 'Quiz retrieved successfully',
        data: quiz,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve quiz',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ): Promise<{
    success: boolean;
    message: string;
    data: Quiz;
  }> {
    try {
      const quiz = await this.quizService.update(id, updateQuizDto);
      return {
        success: true,
        message: 'Quiz updated successfully',
        data: quiz,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update quiz',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/toggle-active')
  async toggleActive(@Param('id', ParseUUIDPipe) id: string): Promise<{
    success: boolean;
    message: string;
    data: Quiz;
  }> {
    try {
      const quiz = await this.quizService.toggleActive(id);
      return {
        success: true,
        message: `Quiz ${quiz.isActive ? 'activated' : 'deactivated'} successfully`,
        data: quiz,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to toggle quiz status',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      await this.quizService.remove(id);
      return {
        success: true,
        message: 'Quiz deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete quiz',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Question management endpoints
  @Post(':id/questions')
  async addQuestion(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() questionData: any,
  ): Promise<{
    success: boolean;
    message: string;
    data: Quiz;
  }> {
    try {
      const quiz = await this.quizService.addQuestion(id, questionData);
      return {
        success: true,
        message: 'Question added successfully',
        data: quiz,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to add question',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id/questions/:questionId')
  async removeQuestion(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('questionId', ParseUUIDPipe) questionId: string,
  ): Promise<{
    success: boolean;
    message: string;
    data: Quiz;
  }> {
    try {
      const quiz = await this.quizService.removeQuestion(id, questionId);
      return {
        success: true,
        message: 'Question removed successfully',
        data: quiz,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to remove question',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/questions/:questionId')
  async updateQuestion(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('questionId', ParseUUIDPipe) questionId: string,
    @Body() questionData: any,
  ): Promise<{
    success: boolean;
    message: string;
    data: Quiz;
  }> {
    try {
      const quiz = await this.quizService.updateQuestion(
        id,
        questionId,
        questionData,
      );
      return {
        success: true,
        message: 'Question updated successfully',
        data: quiz,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update question',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
