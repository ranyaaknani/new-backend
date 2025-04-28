@Entity()
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @ManyToOne(() => Formation, formation => formation.modules)
  formation: Formation;

  @OneToMany(() => Session, session => session.module, { cascade: true })
  sessions: Session[];
}
