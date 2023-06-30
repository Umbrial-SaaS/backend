import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import refreshTokenConfig from '@config/refreshToken';
import AppError from '@shared/errors/AppError';
import crypto from 'crypto';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';
import IRefreshTokensRepository from '../repositories/IRefreshTokensRepository';

export type AuthenticateUserReq = {
  email?: string;
  phone?: string;
  password?: string;
};

interface IResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserService {
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
    email,
    password,
    phone,
  }: AuthenticateUserReq): Promise<IResponse> {
    if (!email && !phone) {
      throw new AppError(
        'Telefone ou Email necessário.',
        400,
        'email_or_phone_needed',
      );
    }
    let user: User | null = null;

    if (email) {
      user = await this.usersRepository.findByEmail(email, [
        'userRoles',
        'userRoles.role',
      ]);
    }
    if (phone) {
      user = await this.usersRepository.findByPhone(phone, [
        'userRoles',
        'userRoles.role',
      ]);
    }

    if (!user) {
      throw new AppError('Combinação de email/senha incorreta!', 401);
    }

    if (user.password) {
      if (!password) {
        throw new AppError('Senha necessária', 400, 'need_password');
      }
      const passwordMatched = await this.hashProvider.compareHash(
        password,
        user.password,
      );

      if (!passwordMatched) {
        throw new AppError('Combinação de email/senha incorreta!', 401);
      }
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        roles: user.userRoles,
        deleted_at: user.deletedAt,
        user: {
          id: user.id,
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

    return {
      user,
      access_token: token,
      refresh_token: refreshToken.refreshToken,
    };
  }
}

export default AuthenticateUserService;
