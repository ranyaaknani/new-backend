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
import { Formateur } from 'formateur/formateur.entity';
import { Participant } from 'participant/entities/participant.entity';
import { InvitationEntity } from 'invitation/invitation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';

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

  @Column({ type: 'uuid' })
  formateurId: string;

  @ManyToOne(() => Formateur, (formateur) => formateur.formations)
  @JoinColumn({ name: 'formateurId' })
  formateur: Formateur;

  @OneToMany(() => ModuleEntity, (module) => module.formation, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  modules: ModuleEntity[];

  @OneToMany(() => InvitationEntity, (invitation) => invitation.formation, {
    cascade: true,
    onDelete: 'CASCADE',
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
