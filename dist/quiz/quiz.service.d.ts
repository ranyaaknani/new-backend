import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
export declare class QuizService {
    private quizRepository;
    constructor(quizRepository: Repository<Quiz>);
    validateAnswer(quizId: string, answer: string): Promise<{
        correct: boolean;
        justification: string;
    }>;
}
