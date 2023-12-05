/* eslint-disable prettier/prettier */
import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Product from '../infra/data/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import ICorporationsRepository from '@modules/v1/corporations/repositories/ICorporationsRepository';
import IGalaxPayProvider from '@shared/container/providers/GalaxPayProvider/models/IGalaxPayProvider';

export interface ICreateProductsServiceReq {
  userId: string;
  productData: {
    name: string;
    description?: string;
    periodicity: string
    price: number;
    currency: string;
    active: boolean;
    corporationId: string;
    isSubstription: boolean
  }
}

@injectable()
class CreateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CorporationsRepository')
    private corporationsRepository: ICorporationsRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

    @inject('GalaxPayProvider')
    private galaxPayProvider: IGalaxPayProvider,
  ) { }

  public async execute({
    userId,
    productData,
  }: ICreateProductsServiceReq): Promise<Product> {
    const user = await this.usersRepository.findById(userId, ['seller']);
    if (user === null) {
      throw new AppError('user_not_found', 404);
    }
    console.log({ productData })

    // TODO: Verificar se o cara é dono/funcionario da barbearia. 
    const product = this.productsRepository.create({
      id: this.idGeneratorProvider.generate(),
      ...productData,
    });

    if (product.price < 0) {
      throw new AppError('negative_price');
    }

    const corporation = await this.corporationsRepository.findById(product.corporationId)
    if (!corporation) {
      throw new AppError('Berbershop not found.', 404)
    }
    // if (product.isSubstription) {
    //   await this.galaxPayProvider.createPlan({
    //     myId: product.id,
    //     name: product.name,
    //     periodicity: product.periodicity,
    //     quantity: 1,
    //     value: product.price,
    //     additionalInfo: product.description
    //   })
    // }


    await this.productsRepository.save(product);

    return product;
  }
}

export default CreateProductsService;
