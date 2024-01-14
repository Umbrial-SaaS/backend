import 'reflect-metadata';
import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';
import UserRole from './UserRole';
import RefreshToken from './RefreshToken';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import User from './User';
import CorporationCustomer from '@modules/v1/corporations/infra/data/entities/CorporationCustomer';

@Entity('persons')
class Person {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { name: 'first_name' })
  firstName: string;

  @Column("varchar", { name: 'last_name' })
  lastName: string;

  @Column("varchar", { name: 'phone_number' })
  phoneNumber: string;

  @Column("varchar")
  instagram?: string;

  @Column("varchar")
  avatar?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Relations
  @OneToOne(() => UserRole, (userRole) => userRole.user, { cascade: true, onDelete: 'CASCADE' })
  userRoles: UserRole[];

  @OneToMany(() => CorporationCustomer, (corporationCustomers) => corporationCustomers.person, { cascade: true, onDelete: 'CASCADE' })
  corporationCustomers: CorporationCustomer[];

  @OneToOne(() => User, (user) => user.person)
  user: User;

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

export default Person;
