import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Seller from '../infra/typeorm/entities/Seller';
import { UpdateSellerReqDTO } from '../dtos/UpdateSellerDTO';
import ISellersRepository from '../repositories/ISellersRepository';

export type UpdateSellerServiceReq = {
  userId: string;
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
    @inject('SellersRepository')
    private sellersRepository: ISellersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    defaultInstagramUrl,
    defaultCurrency,
    defaultSupportEmail,
    defaultTwitterUrl,
    userId,
  }: UpdateSellerReqDTO): Promise<Seller> {
    const user = await this.usersRepository.findById(userId, ['seller']);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404, 'user_not_found');
    }
    const { seller } = user;

    seller.defaultTwitterUrl = defaultTwitterUrl;
    seller.defaultInstagramUrl = defaultInstagramUrl;
    seller.defaultCurrency = defaultCurrency;
    seller.defaultSupportEmail = defaultSupportEmail;

    await this.sellersRepository.save(seller);

    return seller;
  }
}

export default CreateUserService;
