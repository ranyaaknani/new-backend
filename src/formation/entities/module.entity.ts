import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Formation } from './formation.entity';
import { ResourceEntity } from 'ressource/entities/ressource.entity';

@Entity('modules')
export class ModuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column({ default: 0 })
  order: number;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ nullable: true })
  duration?: number; // in minutes

  @Column('jsonb', { nullable: true })
  questions?: any[];

  @ManyToOne(() => Formation, (formation) => formation.modules)
  @JoinColumn({ name: 'formationId' })
  formation: Formation;

  @Column({ type: 'uuid' })
  formationId: string;

  @OneToMany(() => ResourceEntity, (resource) => resource.module, {
    cascade: true,
  })
  resources: ResourceEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
