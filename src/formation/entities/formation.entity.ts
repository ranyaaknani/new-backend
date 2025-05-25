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
import { ModuleEntity } from './module.entity';
import { Formateur } from 'formateur/formateur.entity';
import { Participant } from 'participant/entities/participant.entity';

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

  @Column({ default: 'private' })
  accessType: string;

  @Column('jsonb', { nullable: true })
  invitation: {
    mode: string;
    emails: string[];
    linkGenerated: boolean;
    csvFile?: any;
  };

  @ManyToOne(() => Formateur, (formateur) => formateur.formations)
  @JoinColumn({ name: 'formateurId' })
  formateur: Formateur;

  @Column({ type: 'uuid' })
  formateurId: string;

  @OneToMany(() => ModuleEntity, (module) => module.formation, {
    cascade: true,
  })
  modules: ModuleEntity[];

  @ManyToMany(() => Participant)
  @JoinTable()
  participants: Participant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
