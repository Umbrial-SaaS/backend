import ISellersRepository from '@modules/v1/sellers/repositories/ISellersRepository';

import { CreateSellerDTO } from '@modules/v1/sellers/dtos/CreateSellerDTO'
import Seller from '../entities/Seller';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

class SellersRepository implements ISellersRepository {
  private ormRepository: Repository<Seller>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Seller);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Seller | null> {
    return Object.assign(
      new Seller(),
      await this.ormRepository.findOne({
        where: { id },
      }),
    );
  }

  public create(seller: CreateSellerDTO): Seller {
    return Object.assign(new Seller(), seller);
  }

  public async save(data: Seller): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default SellersRepository;
