import { InvitationEntity } from 'invitation/invitation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import { Quiz } from 'quiz/entities/quiz.entity';
import { User } from 'users/user.entity';
import { Certificat } from 'certificat/entities/certificate.entity';
import { Question } from 'question/questions.entity';
import { EvaluationTest } from 'evaluation_test/evaluation_test.entity';
export declare class Formation {
    id: string;
    titre: string;
    domaine: string;
    image: string;
    description: string;
    objectifs: string;
    startDate: Date;
    endDate: Date;
    accessType: string;
    userId: string;
    user: User;
    modules: ModuleEntity[];
    invitations: InvitationEntity[];
    participants: User[];
    quizzes: Quiz[];
    questions: Question[];
    evalTest: EvaluationTest[];
    certificats: Certificat[];
    createdAt: Date;
    updatedAt: Date;
}
