import { Formation } from 'formation/entities/formation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('invitations')
export class InvitationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mode: string;

  @Column('simple-array', { nullable: true })
  emails?: string[];

  @Column('simple-array', { nullable: true })
  fromEmails?: string[];

  @Column('simple-array', { nullable: true })
  toEmails?: string[];

  @Column({ nullable: true })
  invitationLink?: string;

  @Column({ default: false })
  linkGenerated: boolean;

  @Column({ nullable: true })
  csvFile?: string;

  @Column({ nullable: true })
  csvImage?: string;

  @Column({ nullable: true })
  subject?: string;

  @Column('text', { nullable: true })
  message?: string;

  @Column({ nullable: true })
  expiresAt?: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'uuid' })
  formationId: string;

  @ManyToOne(() => Formation, (formation) => formation.invitations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'formationId' })
  formation: Formation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
