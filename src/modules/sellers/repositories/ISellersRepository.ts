import { CreateSellerDTO } from '../dtos/CreateSellerDTO';
import Seller from '../infra/typeorm/entities/Seller';

export default interface ISellersRepository {
  index(): Promise<Seller[]>;
  findById(id: string, relations?: string[]): Promise<Seller | undefined>;
  create(data: CreateSellerDTO): Seller;
  save(data: Seller): Promise<Seller>;
  delete(id: string): Promise<void>;
  insert(data: Seller): Promise<void>;
}
