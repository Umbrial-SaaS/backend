import IRefreshTokensRepository from '@modules/v1/users/repositories/IRefreshTokensRepository';

import ICreateRefreshTokenDTO from '@modules/v1/users/dtos/ICreateRefreshTokenDTO';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime';
import prisma from '@shared/infra/prisma';
import AuthenticationToken from '../entities/RefreshToken';

class RefreshTokensRepository implements IRefreshTokensRepository {
  private ormRepository: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
    DefaultArgs
  >;

  constructor() {
    this.ormRepository = prisma;
  }

  public async findByUserId(id: string): Promise<AuthenticationToken | null> {
    const token = await this.ormRepository.refreshToken.findUnique({
      where: { userId: id },
    });
    return token ? Object.assign(new AuthenticationToken(), token) : null;
  }

  public async findByRefreshToken(
    token: string,
  ): Promise<AuthenticationToken | null> {
    const foundToken = await this.ormRepository.refreshToken.findUnique({
      where: { refreshToken: token },
    });

    return foundToken
      ? Object.assign(new AuthenticationToken(), foundToken)
      : null;
  }

  public async findByAccessToken(
    token: string,
  ): Promise<AuthenticationToken | null> {
    const foundToken = await this.ormRepository.refreshToken.findUnique({
      where: { accessToken: token },
    });

    return foundToken
      ? Object.assign(new AuthenticationToken(), foundToken)
      : null;
  }

  public async create({
    id,
    accessToken,
    expiresIn,
    isActive,
    refreshToken,
    userId,
  }: ICreateRefreshTokenDTO): Promise<AuthenticationToken> {
    const newToken = this.ormRepository.refreshToken.create({
      data: {
        id,
        accessToken,
        expiresIn,
        isActive,
        refreshToken,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return Object.assign(new AuthenticationToken(), {
      id,
      accessToken,
      expiresIn,
      isActive,
      refreshToken,
      userId,
    });
  }
}

export default RefreshTokensRepository;
