import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async validateAnswer(quizId: string, answer: string) {  // ✅ UUID est une string
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz) throw new Error('Quiz not found');

    const isCorrect = quiz.correctAnswer === answer;
    return {
      correct: isCorrect,
      justification: quiz.justification,
    };
  }
}
