import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import UserRole from './UserRole';

@Entity('roles')
class Role {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  // * Relations
  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];
}

export default Role;
