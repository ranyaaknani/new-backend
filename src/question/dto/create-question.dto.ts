import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { QuestionType } from 'question/questions.entity';

export class CreateQuestionDto {
  @IsEnum(QuestionType)
  type: QuestionType;

  @IsString()
  @MinLength(5, { message: 'Question must be at least 5 characters long' })
  question: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => o.type === QuestionType.MULTIPLE_CHOICE)
  @IsArray()
  @ArrayMinSize(2, {
    message: 'Multiple choice questions must have at least 2 options',
  })
  @IsString({ each: true })
  options?: string[];

  @IsString()
  correctAnswer: string;

  @IsNumber()
  @Min(1, { message: 'Points must be at least 1' })
  @Max(100, { message: 'Points cannot exceed 100' })
  points: number;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;

  @IsUUID()
  formationId: string;
}
