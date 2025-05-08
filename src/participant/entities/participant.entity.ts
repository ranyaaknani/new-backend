import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Formation } from '../../formation/entities/formation.entity';
import { Certificat } from 'certificat/entities/ressource.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column()
  email: string;

  @ManyToMany(() => Formation, (formation) => formation.participants)
  formationsSuivies: Formation[];

  @ManyToMany(() => Certificat, (certificat) => certificat.participants)
  @JoinTable()
  certificatsObtenus: Certificat[];
}
