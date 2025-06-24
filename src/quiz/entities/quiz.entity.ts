import { Formation } from 'formation/entities/formation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
    nullable: true,
  })
  score: number;

  @Column({ type: 'uuid' })
  moduleId: string;

  @Column({ type: 'uuid' })
  formationId: string;

  @ManyToOne(() => ModuleEntity, (module) => module.quizzes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'moduleId' })
  module: ModuleEntity;

  @ManyToOne(() => Formation, (formation) => formation.quizzes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'formationId' })
  formation: Formation;

  @OneToMany(() => QuizQuestion, (question) => question.quiz, {
    cascade: true,
    eager: true,
  })
  questions: QuizQuestion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('quiz_questions')
export class QuizQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column('simple-array')
  options: string[];

  @Column()
  correctAnswer: number;

  @Column({ default: 0 })
  order: number;

  @Column({ type: 'uuid' })
  quizId: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
    nullable: true,
  })
  score: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
