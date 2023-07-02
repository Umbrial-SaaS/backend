import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/data/entities/User';

export type ShowUserServiceReq = {
  userId: string;
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: ShowUserServiceReq): Promise<User> {
    console.log('show user');
    const user = await this.usersRepository.findById(userId, ['userRoles']);

    console.log({ user });
    if (!user) {
      throw new AppError('Usuário não encontrado.', 404, 'user_not_found');
    }
    return user;
  }
}

export default CreateUserService;
