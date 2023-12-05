import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Product from '../infra/data/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IShowProductsServiceReq {
  productId: string;
}

@injectable()
class ShowProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    productId,
  }: IShowProductsServiceReq): Promise<Product> {
    const product = await this.productsRepository.findById(productId);
    if (!product) {
      throw new AppError('product_not_found', 404);
    }
    return product;
  }
}

export default ShowProductsService;
