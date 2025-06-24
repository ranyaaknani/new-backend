import { ModuleEntity } from 'modules/entities/module.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('resources')
export class ResourceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  url?: string;

  @Column('text', { nullable: true })
  content?: string;

  @Column({ nullable: true })
  duration?: number;

  @Column({ default: 0 })
  order: number;

  @Column({ default: false })
  isSaved: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  isCompleted: boolean;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('json', { nullable: true })
  tableData?: {
    headers: string[];
    data: string[][];
  };

  @Column({ nullable: true })
  fileName?: string;

  @Column({ nullable: true })
  fileSize?: number;

  @Column({ nullable: true })
  previewUrl?: string;

  @Column({ type: 'uuid' })
  moduleId: string;

  @ManyToOne(() => ModuleEntity, (module) => module.resources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'moduleId' })
  module: ModuleEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
