import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { InvitationEntity } from 'invitation/invitation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import { Quiz } from 'quiz/entities/quiz.entity';
import { User } from 'users/user.entity';
import { Certificat } from 'certificat/entities/certificate.entity';
import { Question } from 'question/questions.entity';
import { EvaluationTest } from 'evaluation_test/evaluation_test.entity';

@Entity('formations')
export class Formation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column()
  domaine: string;

  @Column({ nullable: true })
  image: string;

  @Column('text')
  description: string;

  @Column('text')
  objectifs: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ default: 'private' })
  accessType: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.formations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => ModuleEntity, (module) => module.formation, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  modules: ModuleEntity[];

  @OneToMany(() => InvitationEntity, (invitation) => invitation.formation, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  invitations: InvitationEntity[];

  @ManyToMany(() => User, (user) => user.formations)
  @JoinTable({
    name: 'user_formations',
    joinColumn: { name: 'formationId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  participants: User[];

  @OneToMany(() => Quiz, (quiz) => quiz.formation, {
    cascade: true,
  })
  quizzes: Quiz[];

  @OneToMany(() => Question, (question) => question.formation, {
    cascade: true,
    eager: false,
  })
  questions: Question[];

  @OneToMany(() => EvaluationTest, (evalTest) => evalTest.formation, {
    cascade: true,
    eager: false,
  })
  evalTest: EvaluationTest[];

  @OneToMany(() => Certificat, (certificat) => certificat.formationEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  certificats: Certificat[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
