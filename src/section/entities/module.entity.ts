import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Section, (section) => section.module)
  sections: Section[];
}
