/* eslint-disable no-restricted-syntax */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/data/entities/User';
import IUserRolesRepository from '../repositories/IUserRolesRepository';

export type CreateUserServiceReq = {
  name: string;
  phone: string;
  email?: string;
  profile_photo?: string;
  password?: string;
  roles: number[];
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserRolesRepository')
    private userRolesRepository: IUserRolesRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) {}

  public async execute({
    name,
    phone,
    email,
    password,
    profile_photo,
    roles,
  }: CreateUserServiceReq): Promise<User> {
    const phoneAlreadyUsed = await this.usersRepository.findByPhone(phone);

    if (phoneAlreadyUsed) {
      throw new AppError('Telefone já registrado.', 409, 'phone_already_used');
    }

    if (email) {
      const emailAreadyUsed = await this.usersRepository.findByEmail(email);
      if (emailAreadyUsed) {
        throw new AppError('Email já registrado.', 409, 'email_already_used');
      }
    }

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    const user = this.usersRepository.create({
      id: crypto.randomUUID(),
      name,
      phone,
      email,
      password,
      profile_photo,
      seller: {
        id: this.idGeneratorProvider.generate(),
        defaultCurrency: 'BRL',
        defaultSupportEmail: email,
        defaultInstagramUrl: undefined,
        defaultTwitterUrl: undefined,
        notificationPreferences: {
          id: this.idGeneratorProvider.generate(),
          emailComments: true,
          emailFreeDownloads: true,
          emailPersonalizedProductAnnoucements: true,
          emailPurchases: true,
          emailRecurringPayments: true,
          mobileFreeDownloads: true,
          mobilePurchases: true,
          mobileRecurringPayments: true,
        },
      },
    });
    user.userRoles = [];

    for (const roleId of roles) {
      const userRole = this.userRolesRepository.create({
        id: crypto.randomUUID(),
        roleId,
        userId: user.id,
      });
      user.userRoles.push(userRole);
    }

    await this.usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
