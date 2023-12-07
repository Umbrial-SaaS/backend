import 'reflect-metadata';
import { Exclude, Expose } from 'class-transformer';

import UserRole from './UserRole';
import RefreshToken from './RefreshToken';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import Person from './Person';
import CorporationStaff from '@modules/v1/corporations/infra/data/entities/CorporationStaff';

@Entity('users')
class User {
  @PrimaryColumn("varchar")
  id: string;

  @Column("varchar")
  email: string;

  @Exclude()
  @Column("varchar",)
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // ?  Relations 
  @Column("varchar", { name: 'person_id' })
  personId: string;

  @OneToOne(() => Person, (person) => person.user)
  person: Person

  @OneToOne(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

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
