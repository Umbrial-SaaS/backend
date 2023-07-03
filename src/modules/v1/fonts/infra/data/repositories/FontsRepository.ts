import prisma from '@shared/infra/prisma';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime';
import IFontsRepository from '@modules/v1/fonts/repositories/IFontsRepository';
import Font from '../entities/Font';

class FontsRepository implements IFontsRepository {
  private ormRepository: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
    DefaultArgs
  >;

  constructor() {
    this.ormRepository = prisma;
  }

  async index(): Promise<Font[]> {
    const fonts = await this.ormRepository.font.findMany();
    return fonts.map(font => Object.assign(new Font(), font));
  }

  async findById(id: string): Promise<Font> {
    return Object.assign(
      new Font(),
      await this.ormRepository.font.findUnique({
        where: { id },
      }),
    );
  }
}

export default FontsRepository;
