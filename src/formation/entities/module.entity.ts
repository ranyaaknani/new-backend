import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Formation } from './formation.entity';

@Entity('modules')
export class ModuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column('jsonb', { default: [] })
  resources: {
    type: string;
    url?: string;
    content?: string;
  }[];

  @Column('jsonb', { default: [] })
  questions: any[];

  @ManyToOne(() => Formation, (formation) => formation.modules)
  @JoinColumn({ name: 'formationId' })
  formation: Formation;

  @Column({ type: 'uuid' })
  formationId: string;
}
