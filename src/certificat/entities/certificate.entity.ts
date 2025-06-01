import { Formation } from 'formation/entities/formation.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'users/user.entity';

@Entity()
export class Certificat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomParticipant: string;

  @Column()
  formation: string;

  @Column()
  dateObtention: Date;

  @Column()
  urlPdf: string;

  // Reference to Formation entity
  @Column('uuid')
  formationId: string;

  @ManyToOne(() => Formation, (formation) => formation.certificats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'formationId' })
  formationEntity: Formation;

  // Many-to-Many relationship with Users
  @ManyToMany(() => User, (user) => user.certificatsObtenus, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'certificat_participants', // Custom join table name
    joinColumn: {
      name: 'certificatId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  participants: User[];
}
