import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity';
import { Module } from './module.entity';

@Entity()
export class Formation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: false })
  archived: boolean;

  @ManyToOne(() => User, user => user.formations)
  formateur: User;

  @OneToMany(() => Module, module => module.formation, { cascade: true })
  modules: Module[];
}
