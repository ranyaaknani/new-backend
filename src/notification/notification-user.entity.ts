import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Notification } from './notifications.entity';
import { User } from 'users/user.entity';

@Entity('notification_users')
export class NotificationUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({ nullable: true })
  readAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('uuid')
  notificationId: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(
    () => Notification,
    (notification) => notification.notificationUsers,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'notificationId' })
  notification: Notification;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
