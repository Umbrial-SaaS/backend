import { injectable, inject } from 'tsyringe';
import Product from '../infra/data/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IListProductsServiceReq {
  sellerId: string;
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    sellerId,
  }: IListProductsServiceReq): Promise<Product[]> {
    const products = await this.productsRepository.filterBy({ sellerId });

    return products;
  }
}

export default ListProductsService;
