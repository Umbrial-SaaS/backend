/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import refreshTokenConfig from '@config/refreshToken';
import crypto from 'crypto';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import { env } from '@config/env';
import axios from 'axios';
import RolesEnum from '@shared/enums/RolesEnum';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/data/entities/User';
import IRefreshTokensRepository from '../repositories/IRefreshTokensRepository';
import IUserRolesRepository from '../repositories/IUserRolesRepository';

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

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

    @inject('UserRolesRepository')
    private userRolesRepository: IUserRolesRepository,
  ) { }

  public async execute({
    accessToken,
  }: GoogleAuthenticateUserReq): Promise<IResponse> {
    const { data } = await axios.post(
      'https://accounts.google.com/o/oauth2/token',
      {
        code: accessToken,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_SECRET_KEY,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/callback',
      },
    );
    console.log({ data });

    const googleAccessToken = data.access_token;

    const userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const headers = {
      Authorization: `Bearer ${googleAccessToken}`,
    };

    const userInfoResponse = await axios.get(userInfoUrl, { headers });
    const userData = userInfoResponse.data;

    let user = await this.usersRepository.findByEmail(userData.email, [
      'userRoles',
      'userRoles.role',
    ]);

    if (!user) {
      user = this.usersRepository.create({
        id: this.idGeneratorProvider.generate(),
        name: userData.name,
        profile_photo: userData.picure,
        email: userData.email,
        seller: {
          id: this.idGeneratorProvider.generate(),
          notificationPreferences: {
            id: this.idGeneratorProvider.generate(),
            emailComments: true,
            emailFreeDownloads: true,
            emailPersonalizedProductAnnoucements: true,
            emailPurchases: true,
            emailRecurringPayments: true,
            mobileFreeDownloads: true,
            mobilePurchases: true,
            mobileRecurringPayments: true,
          },
        },
      });
      const userRole = this.userRolesRepository.create({
        id: crypto.randomUUID(),
        roleId: RolesEnum.Seller,
        userId: user.id,
      });
      await this.usersRepository.save(user);
    }
    let shouldUpdate = false;
    if (user.name !== userData.name) {
      user.name = userData.name;
      shouldUpdate = true;
    }
    if (user.avatar !== userData.picure) {
      user.avatar = userData.picture;
      shouldUpdate = true;
    }
    if (shouldUpdate) {
      await this.usersRepository.update(user);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        roles: user.userRoles,
        deleted_at: user.deletedAt,
        user,
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
    console.log({ user });
    return {
      user,
      access_token: token,
      refresh_token: refreshToken.refreshToken,
    };
  }
}

export default GoogleAuthenticateUserService;
