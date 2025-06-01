import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Module } from './module.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @ManyToOne(() => Module, (module) => module.sections)
  module: Module;
}
