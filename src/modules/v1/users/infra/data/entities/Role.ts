import 'reflect-metadata';
import UserRole from './UserRole';
import { Entity, PrimaryColumn, Column, OneToOne, OneToMany } from 'typeorm';

@Entity('roles')
class Role {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}

export default Role;
