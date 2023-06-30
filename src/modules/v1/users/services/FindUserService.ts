import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

export type FindUserServiceReq = {
  phone?: string;
  email?: string;
};

@injectable()
class FindUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    phone,
    email,
  }: FindUserServiceReq): Promise<User | undefined> {
    if (!phone && !email) {
      throw new AppError('Filtros necessarios!', 400, 'params_needed');
    }
    const user = await this.usersRepository.findBy({ phone, email });
    console.table({ phone, email });

    if (!user) {
      throw new AppError('Pessoa não encontrada.', 404, 'user_not_found');
    }
    return user;
  }
}

export default FindUserService;
