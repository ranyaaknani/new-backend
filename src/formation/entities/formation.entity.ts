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
import { InvitationEntity } from 'invitation/invitation.entity';
import { ModuleEntity } from 'modules/entities/module.entity';
import { Quiz } from 'quiz/entities/quiz.entity';
import { User } from 'users/user.entity';
import { Certificat } from 'certificat/entities/certificate.entity';

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

  @ManyToMany(() => User, (user) => user.formations)
  @JoinTable({
    name: 'formation_participants',
    joinColumn: { name: 'formationId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  participants: User[];

  @OneToMany(() => Quiz, (quiz) => quiz.formation, {
    cascade: true,
  })
  quizzes: Quiz[];

  @OneToMany(() => Certificat, (certificat) => certificat.formationEntity)
  certificats: Certificat[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
