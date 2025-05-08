import { Section } from 'section/entities/section.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column('simple-array')
  options: string[];

  @Column()
  correctAnswer: string;

  @Column()
  justification: string;

  @ManyToOne(() => Section, (section) => section.quizzes)
  section: Section;
}
