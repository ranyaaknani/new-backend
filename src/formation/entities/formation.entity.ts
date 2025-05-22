import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ nullable: true })
  image: string;

  @Column()
  domaine: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  objectifs: string;

  @Column({ default: false })
  archived: boolean;

  @Column({
    type: 'enum',
    enum: ['private', 'public'],
    default: 'private',
  })
  accessType: 'private' | 'public';

  @Column({ type: 'json', nullable: true })
  invitation: {
    mode: 'email' | 'link' | 'csv';
    emails: string[];
    linkGenerated: boolean;
    csvFile: any;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.formations)
  formateur: User;

  @OneToMany(() => Module, (module) => module.formation, { cascade: true })
  modules: Module[];

  @ManyToMany(() => Participant, (participant) => participant.formationsSuivies)
  @JoinTable()
  participants: Participant[];
}
