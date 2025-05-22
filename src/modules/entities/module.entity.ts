import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Formation } from '../../formation/entities/formation.entity';
import { Section } from 'section/entities/section.entity';

interface QCMOption {
  texte: string;
  justification: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  options: QCMOption[];
}

interface Resource {
  type: 'video' | 'pdf' | 'word' | 'paragraph' | 'table';
  url?: string;
  content?: string;
  columns?: string[];
  rows?: string[][];
}

@Entity()
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @OneToMany(() => Section, (section) => section.module, { cascade: true })
  sections: Section[];

  @Column({ type: 'json', default: [] })
  questions: Question[];

  @Column({ type: 'json', default: [] })
  resources: Resource[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Formation, (formation) => formation.modules, {
    onDelete: 'CASCADE',
  })
  formation: Formation;
}
