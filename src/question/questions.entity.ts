import { Formation } from 'formation/entities/formation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple-choice',
  TRUE_FALSE = 'true-false',
  SHORT_ANSWER = 'short-answer',
}

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.MULTIPLE_CHOICE,
  })
  type: QuestionType;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'json', nullable: true })
  options: string[] | null;

  @Column({ type: 'text' })
  correctAnswer: string;

  @Column({ type: 'int', default: 1 })
  points: number;

  @Column({ type: 'text', nullable: true })
  explanation: string | null;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'uuid' })
  formationId: string;

  @ManyToOne(() => Formation, (formation) => formation.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'formationId' })
  formation: Formation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
