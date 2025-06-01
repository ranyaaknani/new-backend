import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Formation } from '../../formation/entities/formation.entity';
import { Certificat } from 'certificat/entities/certificate.entity';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['Débutant', 'Intermédiaire', 'Avancé'],
    default: 'Débutant',
  })
  niveau: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  score: number;

  @Column({ default: false })
  certificatObtenu: boolean;

  @Column({
    type: 'enum',
    enum: ['Inscrit', 'En cours', 'Terminé', 'Annulé'],
    default: 'Inscrit',
  })
  statusFormation: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  dateInscription: Date;

  @UpdateDateColumn()
  dateModification: Date;

  // Relations
  @ManyToOne(() => Formation, (formation) => formation.participants, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'formationId' })
  formation: Formation;

  @Column()
  formationId: string;

  @ManyToMany(() => Certificat, (certificat) => certificat.participants)
  @JoinTable({
    name: 'participant_certificats',
    joinColumn: { name: 'participantId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'certificatId', referencedColumnName: 'id' },
  })
  certificatsObtenus: Certificat[];
}
