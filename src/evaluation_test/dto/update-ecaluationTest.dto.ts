import { UpdateQuestionDto } from 'question/dto/update-question.dto';

export class UpdateEvaluationTestDto {
  isEnabled?: boolean;
  title?: string;
  timeLimit?: number;
  passingScore?: number;
  description?: string;
  formationId: string;
  questions?: UpdateQuestionDto[];
}
