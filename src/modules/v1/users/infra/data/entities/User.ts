import { Exclude, Expose } from 'class-transformer';
import 'reflect-metadata';

import uploadConfig from '@config/upload';
import Seller from '@modules/v1/sellers/infra/data/entities/Seller';
import UserRole from './UserRole';
import RefreshToken from './RefreshToken';

class User {
  id: string;

  name?: string;

  phone?: string;

  bio?: string;

  email: string;

  googleId?: string;

  facebookId?: string;

  avatar?: string;

  @Exclude()
  password?: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;

  // Relations
  userRoles: UserRole[];

  seller: Seller;

  refreshTokens: RefreshToken[];

  @Expose({ name: 'avatar' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return process.env.DEFAULT_USER_AVATAR_URL || '';
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.${process.env.DIGITAL_OCEAN_ENDPOINT}/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
