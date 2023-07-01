import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import bcrypt from 'bcrypt';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/data/entities/User';

export type UpdateUserServiceReq = {
  user_id: string;
  name?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  password?: string;
  deleted?: boolean;
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    name,
    phone,
    email,
    password,
    avatar,
    deleted,
  }: UpdateUserServiceReq): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404, 'user_not_found');
    }

    if (phone) {
      const phoneAlreadyUsed = await this.usersRepository.findByPhone(phone);
      if (phoneAlreadyUsed) {
        throw new AppError(
          'Telefone já registrado.',
          409,
          'phone_already_used',
        );
      }
      user.phone = phone;
    }

    if (email) {
      const emailAreadyUsed = await this.usersRepository.findByEmail(email);
      if (emailAreadyUsed) {
        throw new AppError('Email já registrado.', 409, 'email_already_used');
      }
      user.email = email;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (name) {
      user.name = name;
    }

    if (avatar) {
      if (user.avatar) {
        await this.storageProvider.deleteFile(user.avatar);
      }
      user.avatar = await this.storageProvider.saveFile(avatar);
    }

    if (!deleted) {
      user.deletedAt = undefined;
    } else {
      user.deletedAt = new Date();
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
