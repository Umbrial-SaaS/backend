import 'reflect-metadata';

import User from '@modules/v1/users/infra/data/entities/User';
import NotificationPreference from '@modules/v1/notifications/infra/data/entities/NotificationPreference';

export default class Seller {
  id: string;

  defaultSupportEmail?: string;

  defaultTwitterUrl?: string;

  defaultCurrency?: string;

  defaultInstagramUrl?: string;

  userId: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;

  // * Relations
  user: User;

  notificationPreferences: NotificationPreference;
}
