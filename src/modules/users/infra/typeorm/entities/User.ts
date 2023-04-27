import { Exclude } from 'class-transformer';
import 'reflect-metadata';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email?: string;

  @Column()
  profile_photo?: string;

  @Column()
  @Exclude()
  password?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // ? Relations

  // @OneToMany(() => Error, error => error.product)
  // errors: Error[];
}

export default User;
