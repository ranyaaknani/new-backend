import { Formation } from 'formation/entities/formation.entity';
import { Question } from 'question/questions.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('evaluation_tests')
export class EvaluationTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  isEnabled: boolean;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  timeLimit: number;

  @Column({ type: 'int' })
  passingScore: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Question, (question) => question.evaluationTest, {
    cascade: true,
  })
  questions: Question[];

  @Column({ type: 'uuid', nullable: false })
  formationId: string;

  @ManyToOne(() => Formation, (formation) => formation.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'formationId' })
  formation: Formation;
}
