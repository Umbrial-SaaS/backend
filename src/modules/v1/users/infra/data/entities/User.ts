import 'reflect-metadata';
import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';
import Seller from '@modules/v1/sellers/infra/data/entities/Seller';
import UserRole from './UserRole';
import RefreshToken from './RefreshToken';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import Person from './Person';
import CorporationStaff from '@modules/v1/corporations/infra/data/entities/CorporationStaff';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // ?  Relations 
  @Column({ name: 'person_id' })
  personId: string;

  @OneToOne(() => Person, (person) => person.user)
  person: Person

  @OneToOne(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @OneToOne(() => Seller, (seller) => seller.user)
  seller: Seller;

  @OneToOne(() => User, (user) => user.person)
  user: User;

  @OneToMany(() => CorporationStaff, (corporationStaff) => corporationStaff.corporation)
  corporationStaff: CorporationStaff[];

  refreshTokens: RefreshToken[];

  // @Expose({ name: 'avatar' })
  // getAvatarUrl(): string | null {
  //   if (!this.avatar) {
  //     return process.env.DEFAULT_USER_AVATAR_URL || '';
  //   }

  //   switch (uploadConfig.driver) {
  //     case 'disk':
  //       return `${process.env.APP_API_URL}/files/${this.avatar}`;
  //     case 's3':
  //       return `https://${uploadConfig.config.aws.bucket}.${process.env.DIGITAL_OCEAN_ENDPOINT}/${this.avatar}`;
  //     default:
  //       return null;
  //   }
  // }
}

export default User;
