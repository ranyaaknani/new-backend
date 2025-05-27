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
import { InvitationEntity } from 'invitation/invitation.entity';

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

  @ManyToOne(() => Formateur, (formateur) => formateur.formations)
  @JoinColumn({ name: 'formateurId' })
  formateur: Formateur;

  @Column({ type: 'uuid' })
  formateurId: string;

  @OneToMany(() => ModuleEntity, (module) => module.formation, {
    cascade: true,
  })
  modules: ModuleEntity[];

  @OneToMany(() => InvitationEntity, (invitation) => invitation.formation, {
    cascade: true,
  })
  invitations: InvitationEntity[];

  @ManyToMany(() => Participant)
  @JoinTable()
  participants: Participant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
