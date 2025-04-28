// src/formation/formation.entity.ts
import { Formateur } from 'formateur/formateur.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class Formation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  description: string;

  @Column()
  dateDebut: Date;

  @Column()
  dateFin: Date;

  @ManyToOne(() => Formateur, (formateur) => formateur.formations)
  formateur: Formateur;
    participants: any;
}
