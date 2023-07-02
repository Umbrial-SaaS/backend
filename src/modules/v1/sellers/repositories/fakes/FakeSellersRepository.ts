import { CreateSellerDTO } from '../../dtos/CreateSellerDTO';
import Seller from '../../infra/data/entities/Seller';
import ISellersRepository from '../ISellersRepository';
import { fakeSeller } from './seeds';

class FakeSellersRepository implements ISellersRepository {
  private sellers: Seller[] = [fakeSeller];

  public async findById(id: string): Promise<Seller | null> {
    const user = this.sellers.find(item => item.id === id);

    return user || null;
  }

  public create(data: CreateSellerDTO): Seller {
    const user = new Seller();
    Object.assign(user, data);

    this.sellers.push(user);

    return user || null;
  }

  public async save(user: Seller): Promise<void> {
    this.sellers.push(user);
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.sellers.findIndex(item => item.id === id);

    this.sellers.splice(userIndex, 1);
  }
}

export default FakeSellersRepository;
