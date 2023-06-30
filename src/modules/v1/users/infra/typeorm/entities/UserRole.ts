import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Role from './Role';
import User from './User';

@Entity('user_roles')
class UserRole {
  @PrimaryColumn()
  id: string;

  @Column()
  roleId: number;

  @Column()
  userId: string;

  // * Relations
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => User, user => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default UserRole;
