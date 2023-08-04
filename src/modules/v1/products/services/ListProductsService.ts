/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';
import Product from '../infra/data/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IListProductsServiceReq {
  sellerId: string;

  page: number;
  pageSize: number;
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  public async execute({
    sellerId,
    page,
    pageSize,
  }: IListProductsServiceReq): Promise<Product[]> {
    const products = await this.productsRepository.filterBy(
      { sellerId },
      page,
      pageSize,
    );

    return products;
  }
}

export default ListProductsService;
