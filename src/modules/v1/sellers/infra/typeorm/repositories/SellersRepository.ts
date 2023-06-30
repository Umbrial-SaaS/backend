import { getRepository, Repository } from 'typeorm';

import IFindUserDTO from '@modules/v1/users/dtos/IFindUserDTO';
import clearJson from '@shared/functions/clearJson';
import ISellersRepository from '@modules/v1/sellers/repositories/ISellersRepository';

import { CreateSellerDTO } from '@modules/v1/sellers/dtos/CreateSellerDTO';
import appDataSource from '@shared/infra/typeorm';
import Seller from '../entities/Seller';

class UsersRepository implements ISellersRepository {
  private ormRepository: Repository<Seller>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(Seller);
  }

  public async index(): Promise<Seller[]> {
    const breeds = await this.ormRepository.find({
      order: { createdAt: 'ASC' },
    });
    return breeds;
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Seller | null> {
    return (
      this.ormRepository.findOne({
        where: { id },
        relations,
      }) || null
    );
  }

  public async findBy({ email, phone }: IFindUserDTO): Promise<Seller | null> {
    return (
      this.ormRepository.findOne({
        where: clearJson({ email, phone }),
      }) || null
    );
  }

  public create(seller: CreateSellerDTO): Seller {
    return this.ormRepository.create(seller);
  }

  public async save(data: Seller): Promise<Seller> {
    return this.ormRepository.save(data);
  }

  public async insert(data: Seller): Promise<void> {
    await this.ormRepository.insert(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UsersRepository;
