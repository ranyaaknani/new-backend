import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Module } from '../../modules/entities/module.entity';
import { Participant } from '../../participant/entities/participant.entity';

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

  @ManyToOne(() => User, (user) => user.formations)
  formateur: User;

  @OneToMany(() => Module, (module) => module.formation, { cascade: true })
  modules: Module[];

  @ManyToMany(() => Participant, (participant) => participant.formationsSuivies)
  @JoinTable()
  participants: Participant[];
}
