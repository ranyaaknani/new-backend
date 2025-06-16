import { Formation } from 'formation/entities/formation.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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

  @Column()
  formationId: string;

  @ManyToOne(() => Formation, (formation) => formation.participants, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'formationId' })
  formation: Formation;
}
