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
  duration?: number;

  @Column('jsonb', { nullable: true, default: '[]' })
  questions?: any[];

  @Column({ type: 'uuid' })
  formationId: string;

  @ManyToOne(() => Formation, (formation) => formation.modules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'formationId' })
  formation: Formation;

  @OneToMany(() => ResourceEntity, (resource) => resource.module, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  resources: ResourceEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
