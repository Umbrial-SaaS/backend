import prisma from '@shared/infra/prisma';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime';
import IProductsRepository from '@modules/v1/products/repositories/IProductsRepository';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
    DefaultArgs
  >;

  constructor() {
    this.ormRepository = prisma;
  }

  async index(): Promise<Product[]> {
    const fonts = await this.ormRepository.product.findMany();
    return fonts.map(font => Object.assign(new Product(), font));
  }

  async findById(id: string): Promise<Product> {
    return Object.assign(
      new Product(),
      await this.ormRepository.product.findUnique({
        where: { id },
      }),
    );
  }
}

export default ProductsRepository;
