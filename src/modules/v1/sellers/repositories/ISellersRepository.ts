import { CreateSellerDTO } from '../dtos/CreateSellerDTO';
import Seller from '../infra/data/entities/Seller';

export default interface ISellersRepository {
  findById(id: string, relations?: string[]): Promise<Seller | null>;
  create(data: CreateSellerDTO): Seller;
  save(data: Seller): Promise<void>;
  delete(id: string): Promise<void>;
}
