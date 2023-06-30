import 'reflect-metadata';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Seller from '@modules/v1/sellers/infra/typeorm/entities/Seller';

@Entity('notification_preferences')
export default class NotificationPreference {
  @PrimaryColumn()
  id: string;

  @Column()
  emailPurchases?: boolean;

  @Column()
  emailRecurringPayments?: boolean;

  @Column()
  emailFreeDownloads?: boolean;

  @Column()
  emailPersonalizedProductAnnoucements?: boolean;

  @Column()
  emailComments?: boolean;

  @Column()
  mobilePurchases?: boolean;

  @Column()
  mobileRecurringPayments?: boolean;

  @Column()
  mobileFreeDownloads?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  sellerId: string;

  // * Relations
  @OneToOne(() => Seller, seller => seller.notificationPreferences)
  seller: Seller;
}
