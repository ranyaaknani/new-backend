// src/formateur/formateur.entity.ts
import { Formation } from 'formation/formation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Formateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  email: string;

  @Column()
  motDePasse: string;

  @OneToMany(() => Formation, (formation) => formation.formateur)
  formations: Formation[];
}
