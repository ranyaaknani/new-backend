import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Formation } from '../../formation/entities/formation.entity';
import { Section } from 'section/entities/section.entity';

@Entity()
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @ManyToOne(() => Formation, (formation) => formation.modules)
  formation: Formation;

  @OneToMany(() => Section, (section) => section.module, { cascade: true })
  sections: Section[];
}
