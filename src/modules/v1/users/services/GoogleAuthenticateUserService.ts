import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import refreshTokenConfig from '@config/refreshToken';
import AppError from '@shared/errors/AppError';
import crypto from 'crypto';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { env } from '@config/env';
import axios from 'axios';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/data/entities/User';
import IRefreshTokensRepository from '../repositories/IRefreshTokensRepository';

export type GoogleAuthenticateUserReq = {
  accessToken: string;
};

interface IResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

@injectable()
class GoogleAuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) {}

  public async execute({
    accessToken,
  }: GoogleAuthenticateUserReq): Promise<any> {
    console.table({ accessToken });
    return 'Ok';
    const { data } = await axios.post(
      'https://accounts.google.com/o/oauth2/token',
      {
        code: accessToken,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_SECRET_KEY,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3337/callback',
      },
    );
    console.log({ data });
    return data;
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        roles: user.userRoles,
        deleted_at: user.deletedAt,
        user: {
          id: user.id,
          name: user.name,
        },
      },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    const refreshToken = await this.refreshTokensRepository.create({
      id: this.idGeneratorProvider.generate(),
      accessToken: token,
      expiresIn: refreshTokenConfig.refreshToken.expiresIn,
      isActive: true,
      refreshToken: crypto.randomBytes(32).toString('hex'),
      userId: user.id,
    });

    console.log('OK');
    return {
      user,
      access_token: token,
      refresh_token: refreshToken.refreshToken,
    };
  }
}

export default GoogleAuthenticateUserService;
