import { container } from 'tsyringe';

import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import UsersRepository from '@modules/v1/users/infra/data/repositories/UsersRepository';
import './providers';
import IUserRolesRepository from '@modules/v1/users/repositories/IUserRolesRepository';
import UserRolesRepository from '@modules/v1/users/infra/data/repositories/UserRolesRepository';
import IRefreshTokensRepository from '@modules/v1/users/repositories/IRefreshTokensRepository';
import RefreshTokensRepository from '@modules/v1/users/infra/data/repositories/RefreshTokensRepository';
import NotificationPreferencesRepository from '@modules/v1/notifications/infra/data/repositories/NotificationPreferencesRepository';
import INotificationPreferencesRepository from '@modules/v1/notifications/repositories/INotificationPreferencesRepository';
import ISellersRepository from '@modules/v1/sellers/repositories/ISellersRepository';
import SellersRepository from '@modules/v1/sellers/infra/data/repositories/SellersRepository';
import FontsRepository from '@modules/v1/fonts/infra/data/repositories/FontsRepository';
import IFontsRepository from '@modules/v1/fonts/repositories/IFontsRepository';
import ProductsRepository from '@modules/v1/products/infra/data/repositories/ProductsRepository';
import IProductsRepository from '@modules/v1/products/repositories/IProductsRepository';
import RolesRepository from '@modules/v1/users/infra/data/repositories/RolesRepository';
import IRolesRepository from '@modules/v1/users/repositories/IRolesRepository';
import ICorporationsRepository from '@modules/v1/corporations/repositories/ICorporationsRepository';
import IPersonsRepository from '@modules/v1/users/repositories/IPersonsRepository';
import PersonsRepository from '@modules/v1/users/infra/data/repositories/PersonsRepository';
import ICorporationServicesRepository from '@modules/v1/corporations/repositories/ICorporationServicesRepository';
import ICorporationStaffStaffRepository from '@modules/v1/corporations/repositories/ICorporationStaffRepository';
import CorporationServicesRepository from '@modules/v1/corporations/infra/data/repositories/CorporationServicesRepository';
import CorporationStaffRepository from '@modules/v1/corporations/infra/data/repositories/CorporationStaffRepository';
import CorporationsRepository from '@modules/v1/corporations/infra/data/repositories/CorporationsRepository';



container.registerSingleton<ICorporationStaffStaffRepository>(
  'CorporationStaffRepository',
  CorporationStaffRepository,
);
container.registerSingleton<ICorporationServicesRepository>(
  'CorporationServicesRepository',
  CorporationServicesRepository,
);
container.registerSingleton<IPersonsRepository>(
  'PersonsRepository',
  PersonsRepository,
);
container.registerSingleton<ICorporationsRepository>(
  'CorporationsRepository',
  CorporationsRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IFontsRepository>(
  'FontsRepository',
  FontsRepository,
);

container.registerSingleton<ISellersRepository>(
  'SellersRepository',
  SellersRepository,
);

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

