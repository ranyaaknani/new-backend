import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Module } from '../../modules/entities/module.entity';
import { Ressource } from '../../ressource/entities/ressource.entity';
import { Quiz } from 'quiz/entities/quiz.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @ManyToOne(() => Module, (module) => module.sections)
  module: Module;

  @OneToMany(() => Quiz, (quiz) => quiz.section, { cascade: true })
  quizzes: Quiz[];

  @OneToMany(() => Ressource, (ressource) => ressource.section, { cascade: true })
  ressources: Ressource[];
}
