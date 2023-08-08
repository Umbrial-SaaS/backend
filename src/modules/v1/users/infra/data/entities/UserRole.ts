import 'reflect-metadata';

import Role from './Role';
import User from './User';
import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from 'typeorm';

@Entity('user_roles')
class UserRole {
  @PrimaryColumn()
  id: string;

  @Column()
  roleId: number;

  @Column()
  userId: string;

  // * Relations
  @OneToOne(() => Role, (role) => role.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'roleId'
  })
  role: Role;

  // * Relations
  @OneToOne(() => User, (user) => user.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'userId'
  })
  user: User;
}

export default UserRole;
