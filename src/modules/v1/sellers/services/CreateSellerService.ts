/* eslint-disable no-restricted-syntax */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import Seller from '../infra/data/entities/Seller';
import { CreateSellerReqDTO } from '../dtos/CreateSellerDTO';
import ISellersRepository from '../repositories/ISellersRepository';

@injectable()
class CreateSellerService {
  constructor(
    @inject('SellersRepository')
    private sellersRepository: ISellersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) {}

  public async execute({
    defaultInstagramUrl,
    defaultCurrency,
    defaultSupportEmail,
    defaultTwitterUrl,
    userId,
  }: CreateSellerReqDTO): Promise<Seller> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Seller not found.', 409, 'user_not_found');
    }

    const seller = this.sellersRepository.create({
      id: this.idGeneratorProvider.generate(),
      defaultInstagramUrl,
      defaultCurrency,
      defaultSupportEmail,
      defaultTwitterUrl,
      userId,
    });

    await this.sellersRepository.save(seller);
    return seller;
  }
}

export default CreateSellerService;
