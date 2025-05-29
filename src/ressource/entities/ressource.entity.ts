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
  videoLink?: string;

  @Column({ nullable: true })
  pdfLink?: string;

  @Column({ nullable: true })
  textLink?: string;

  @Column('text', { nullable: true })
  content?: string;

  @Column({ nullable: true })
  duration?: number;

  @Column({ default: 0 })
  order: number;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column('text', { nullable: true })
  description?: string;

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
