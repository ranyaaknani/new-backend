import { Expose, Type } from 'class-transformer';
import { QuestionType } from 'question/questions.entity';

export class QuestionResponseDto {
  @Expose()
  id: string;

  @Expose()
  type: QuestionType;

  @Expose()
  question: string;

  @Expose()
  options?: string[];

  @Expose()
  correctAnswer: string;

  @Expose()
  points: number;

  @Expose()
  explanation?: string;

  @Expose()
  order: number;

  @Expose()
  formationId: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}

export class QuestionAdminResponseDto extends QuestionResponseDto {
  @Expose()
  declare correctAnswer: string;
}
