import 'reflect-metadata';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/v1/users/infra/typeorm/entities/User';
import NotificationPreference from '@modules/v1/notifications/infra/typeorm/entities/NotificationPreference';

@Entity('sellers')
export default class Seller {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  defaultSupportEmail?: string;

  @Column({ nullable: true })
  defaultTwitterUrl?: string;

  @Column({ nullable: true })
  defaultCurrency?: string;

  @Column({ nullable: true })
  defaultInstagramUrl?: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  // * Relations
  @OneToOne(() => User, user => user.seller)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(
    () => NotificationPreference,
    notificationPreference => notificationPreference.seller,
  )
  notificationPreferences: NotificationPreference;
}
