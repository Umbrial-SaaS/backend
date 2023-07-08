import prisma from '@shared/infra/prisma';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime';
import IProductsRepository from '@modules/v1/products/repositories/IProductsRepository';
import { CreateProductDTO } from '@modules/v1/products/dtos/CreateProductDTO';
import { ListProductsDTO } from '@modules/v1/products/dtos/ListProductsDTO';
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

  async filterBy(filters: ListProductsDTO): Promise<Product[]> {
    const results = await this.ormRepository.product.findMany({
      where: {
        sellerId: filters.sellerId,
      },
    });

    return results.map(product => Object.assign(new Product(), product));
  }

  create(product: CreateProductDTO): Product {
    return Object.assign(new Product(), product);
  }

  async save(product: Product): Promise<void> {
    await this.ormRepository.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        url: product.url,
        coverUrl: product.coverUrl,
        thumbnailUrl: product.thumbnailUrl,
        cta: product.cta,
        summary: product.summary,
        pricing: product.pricing,
        currency: product.currency,
        minimumAmount: product.minimumAmount,
        suggestedAmount: product.suggestedAmount,
        flexPrice: product.flexPrice,
        salesLimit: product.salesLimit,
        flexQuantity: product.flexQuantity,
        showSalesCount: product.showSalesCount,
        uniqueKeyLicense: product.uniqueKeyLicense,
      },
    });
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
