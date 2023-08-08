import 'reflect-metadata';

import User from '@modules/v1/users/infra/data/entities/User';
import NotificationPreference from '@modules/v1/notifications/infra/data/entities/NotificationPreference';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('sellers')
export default class Seller {
  @PrimaryColumn()
  id: string;

  @Column()
  defaultSupportEmail?: string;

  @Column()
  defaultTwitterUrl?: string;

  @Column()
  defaultCurrency?: string;

  @Column()
  defaultInstagramUrl?: string;


  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt?: Date;

  // * Relations

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.seller, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'userId'
  })
  user: User;

  notificationPreferences: NotificationPreference;
}
