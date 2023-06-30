import { container } from 'tsyringe';

import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import UsersRepository from '@modules/v1/users/infra/typeorm/repositories/UsersRepository';
import './providers';
import IUserRolesRepository from '@modules/v1/users/repositories/IUserRolesRepository';
import UserRolesRepository from '@modules/v1/users/infra/typeorm/repositories/UserRolesRepository';
import IRefreshTokensRepository from '@modules/v1/users/repositories/IRefreshTokensRepository';
import RefreshTokensRepository from '@modules/v1/users/infra/typeorm/repositories/RefreshTokensRepository';
import INotificationPreferencesRepository from '@modules/v1/notifications/repositories/INotifcationPreferencesRepository';
import NotificationPreferencesRepository from '@modules/v1/notifications/infra/typeorm/repositories/NotificationPreferencesRepository';
import DiskStorageProvider from './providers/StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';

container.registerSingleton<INotificationPreferencesRepository>(
  'NotificationPreferencesRepository',
  NotificationPreferencesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserRolesRepository>(
  'UserRolesRepository',
  UserRolesRepository,
);

container.registerSingleton<IRefreshTokensRepository>(
  'RefreshTokensRepository',
  RefreshTokensRepository,
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
