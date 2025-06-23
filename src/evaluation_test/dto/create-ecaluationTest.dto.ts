import { CreateQuestionDto } from 'question/dto/create-question.dto';

export class CreateEvaluationTestDto {
  isEnabled: boolean;
  title: string;
  timeLimit: number;
  passingScore: number;
  description?: string;
  formationId: string;
  questions: CreateQuestionDto[];
}
