import IProductsRepository from '@modules/v1/products/repositories/IProductsRepository';
import { CreateProductDTO } from '@modules/v1/products/dtos/CreateProductDTO';
import { ListProductsDTO } from '@modules/v1/products/dtos/ListProductsDTO';
import Product from '../entities/Product';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  async filterBy(
    filters: ListProductsDTO,
    page: number,
    pageSize: number,
  ): Promise<Product[]> {
    const results = await this.ormRepository.find({

    });

    return results.map(product => Object.assign(new Product(), product));
  }

  create(product: CreateProductDTO): Product {
    return this.ormRepository.create(product)
  }

  async save(product: Product): Promise<void> {
    await this.ormRepository.save(product);
  }

  async index(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  async findById(id: string): Promise<Product | null> {
    return this.ormRepository.findOne({
      where: {
        id
      }
    })
  }
}

export default ProductsRepository;
