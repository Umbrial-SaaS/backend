import { getRepository, Repository } from 'typeorm';

import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';
import clearJson from '@shared/functions/clearJson';
import ISellersRepository from '@modules/sellers/repositories/ISellersRepository';

import { CreateSellerDTO } from '@modules/sellers/dtos/CreateSellerDTO';
import Seller from '../entities/Seller';

class UsersRepository implements ISellersRepository {
  private ormRepository: Repository<Seller>;

  constructor() {
    this.ormRepository = getRepository(Seller);
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
  ): Promise<Seller | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations,
    });
  }

  public async findBy({
    email,
    phone,
  }: IFindUserDTO): Promise<Seller | undefined> {
    return this.ormRepository.findOne({
      where: clearJson({ email, phone }),
    });
  }

  public async findByName(name: string): Promise<Seller | undefined> {
    const seller = await this.ormRepository.findOne({
      where: { name },
    });

    return seller;
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
