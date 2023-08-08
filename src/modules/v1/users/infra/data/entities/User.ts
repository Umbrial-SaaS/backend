import { Exclude, Expose } from 'class-transformer';
import 'reflect-metadata';

import uploadConfig from '@config/upload';
import Seller from '@modules/v1/sellers/infra/data/entities/Seller';
import UserRole from './UserRole';
import RefreshToken from './RefreshToken';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name?: string;

  @Column()
  phone?: string;

  @Column()
  bio?: string;

  @Column()
  email: string;

  @Column()
  googleId?: string;

  @Column()
  facebookId?: string;

  @Column()
  avatar?: string;

  @Exclude()
  password?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Relations
  @OneToOne(() => UserRole, (userRole) => userRole.user, { cascade: true, onDelete: 'CASCADE' })
  userRoles: UserRole[];

  @OneToOne(() => Seller, (seller) => seller.user, { cascade: true, onDelete: 'CASCADE' })
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
