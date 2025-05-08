import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Participant } from '../../participant/entities/participant.entity';

@Entity()
export class Certificat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomParticipant: string;

  @Column()
  formation: string;

  @Column()
  dateObtention: Date;

  @Column()
  urlPdf: string;

  @ManyToMany(() => Participant, participant => participant.certificatsObtenus)
  participants: Participant[];
}
