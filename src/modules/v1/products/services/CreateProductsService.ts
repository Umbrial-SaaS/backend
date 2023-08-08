/* eslint-disable prettier/prettier */
import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Product from '../infra/data/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface ICreateProductsServiceReq {
  userId: string;
  product: {
    name: string;
    description: string;
    url: string;
    cta: string;
    summary: string;
    pricing: number;
    currency: string;
    minimumAmount?: number
    suggestedAmount?: number
    salesLimit?: number
    flexQuantity: boolean
    flexPrice: boolean;
    showSalesCount: boolean;
    uniqueKeyLicense: boolean;
    customFields: {
      type: string;
      label: string;
    }[];
  };
}

@injectable()
class CreateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) { }

  public async execute({
    userId,
    product,
  }: ICreateProductsServiceReq): Promise<Product> {
    const user = await this.usersRepository.findById(userId, ['seller']);
    console.log(user)
    if (user === null) {
      throw new AppError('user_not_found', 404);
    }
    if (!user.seller) {
      throw new AppError('user_is_not_seller', 400);
    }

    if (product.pricing < 0) {
      throw new AppError('negative_price');
    }
    if (product.pricing < 0) {
      throw new AppError('negative_price');
    }
    if (product.minimumAmount && product.minimumAmount < 0) {
      throw new AppError('negative_mininum_amount');
    }
    if (product.suggestedAmount && product.suggestedAmount < 0) {
      throw new AppError('negative_suggested_amount');
    }
    if (product.salesLimit && product.salesLimit < 1) {
      throw new AppError('invalid_sales_limit');
    }

    const productEntity = this.productsRepository.create({
      id: this.idGeneratorProvider.generate(),
      ...product,
      sellerId: user.seller.id,
      customFields: product.customFields,
    });

    await this.productsRepository.save(productEntity);

    return productEntity;
  }
}

export default CreateProductsService;
