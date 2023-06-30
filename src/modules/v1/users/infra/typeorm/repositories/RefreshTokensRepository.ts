import { getRepository, Repository } from 'typeorm';

import IRefreshTokensRepository from '@modules/v1/users/repositories/IRefreshTokensRepository';

import ICreateRefreshTokenDTO from '@modules/v1/users/dtos/ICreateRefreshTokenDTO';
import appDataSource from '@shared/infra/typeorm';
import AuthenticationToken from '../entities/RefreshToken';

class RefreshTokensRepository implements IRefreshTokensRepository {
  private ormRepository: Repository<AuthenticationToken>;

  constructor() {
    this.ormRepository =
      appDataSource.getRepository<AuthenticationToken>(AuthenticationToken);
  }

  public async findByUserId(id: string): Promise<AuthenticationToken | null> {
    const token = await this.ormRepository.findOne({
      where: { userId: id },
    });

    return token;
  }

  public async findByRefreshToken(
    token: string,
  ): Promise<AuthenticationToken | null> {
    const foundToken = await this.ormRepository.findOne({
      where: { refreshToken: token },
    });

    return foundToken;
  }

  public async findByAccessToken(
    token: string,
  ): Promise<AuthenticationToken | null> {
    const foundToken = await this.ormRepository.findOne({
      where: { accessToken: token },
    });

    return foundToken;
  }

  public async create({
    id,
    accessToken,
    expiresIn,
    isActive,
    refreshToken,
    userId,
  }: ICreateRefreshTokenDTO): Promise<AuthenticationToken> {
    const newToken = this.ormRepository.create({
      id,
      accessToken,
      expiresIn,
      isActive,
      refreshToken,
      userId,
    });

    await this.ormRepository.save(newToken);

    return newToken;
  }

  public async save(data: AuthenticationToken): Promise<AuthenticationToken> {
    return this.ormRepository.save(data);
  }
}

export default RefreshTokensRepository;
