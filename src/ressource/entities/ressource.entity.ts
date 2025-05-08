import { Section } from 'section/entities/section.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Ressource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column()
  type: string; // Exemple : 'pdf', 'video', 'lien'

  @Column()
  url: string;

  @ManyToOne(() => Section, (section) => section.ressources)
  section: Section;
}
