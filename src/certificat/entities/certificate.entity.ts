import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Participant } from '../../participant/entities/participant.entity';

@Entity()
export class Certificat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomParticipant: string;

  @Column()
  formation: string;

  @Column()
  dateObtention: Date;

  @Column()
  urlPdf: string;

  @ManyToMany(
    () => Participant,
    (participant) => participant.certificatsObtenus,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinTable()
  participants: Participant[];
}
