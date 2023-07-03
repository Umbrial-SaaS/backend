import { CreateProductDTO } from '../dtos/CreateProductDTO';
import { ListProductsDTO } from '../dtos/ListProductsDTO';
import Product from '../infra/data/entities/Product';

export default interface IProductsRepository {
  findById(id: string): Promise<Product | null>;
  filterBy(filters: ListProductsDTO): Promise<Product[]>;
  index(): Promise<Product[]>;
  create(product: CreateProductDTO): Product;
  save(product: Product): Promise<void>;
}
