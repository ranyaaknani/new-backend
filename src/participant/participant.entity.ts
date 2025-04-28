import { Formation } from 'formation/formation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nom du participant

  @Column()
  email: string; // Email du participant

  @ManyToOne(() => Formation, (formation) => formation.participants, { onDelete: 'CASCADE' })
  formation: Formation; // Chaque participant est lié à UNE formation
}
