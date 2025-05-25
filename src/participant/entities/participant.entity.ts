import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
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

  @ManyToMany(() => Formation, (formation) => formation.participants)
  formationsSuivies: Formation[];

  @ManyToMany(() => Certificat, (certificat) => certificat.participants)
  certificatsObtenus: Certificat[];
}
