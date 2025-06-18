import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { Formation } from 'formation/entities/formation.entity';
import { Certificat } from 'certificat/entities/certificate.entity';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Suspended = 'suspended',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  telephone?: string;

  @Column({ nullable: true })
  linkedInLink?: string;

  @Column({ nullable: true })
  cv?: string;

  @Column({ nullable: true })
  isAccepted?: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Participant,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
  })
  status: UserStatus;

  @Column({ default: false })
  hasCertificate: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Formation, (formation) => formation.participants)
  formations: Formation[];

  @OneToMany(() => Formation, (formation) => formation.user)
  createdFormations: Formation[];

  @ManyToMany(() => Certificat, (certificat) => certificat.participants)
  certificatsObtenus: Certificat[];
}
