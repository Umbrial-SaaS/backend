import ISellersRepository from '@modules/v1/sellers/repositories/ISellersRepository';

import { CreateSellerDTO } from '@modules/v1/sellers/dtos/CreateSellerDTO';
import prisma from '@shared/infra/prisma';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime';
import Seller from '../entities/Seller';

class SellersRepository implements ISellersRepository {
  private ormRepository: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
    DefaultArgs
  >;

  constructor() {
    this.ormRepository = prisma;
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Seller | null> {
    return Object.assign(
      new Seller(),
      await this.ormRepository.seller.findUnique({
        where: { id },
      }),
    );
  }

  public create(seller: CreateSellerDTO): Seller {
    return Object.assign(new Seller(), seller);
  }

  public async save(data: Seller): Promise<void> {
    await this.ormRepository.seller.create({
      data: {
        id: data.id,
        defaultSupportEmail: data.defaultSupportEmail,
        defaultTwitterUrl: data.defaultTwitterUrl,
        defaultCurrency: data.defaultCurrency,
        defaultInstagramUrl: data.defaultInstagramUrl,
        userId: data.userId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.seller.delete({ where: { id } });
  }
}

export default SellersRepository;
