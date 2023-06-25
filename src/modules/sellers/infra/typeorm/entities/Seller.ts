import 'reflect-metadata';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('sellers')
export default class Seller {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  defaultSupportEmail?: string;

  @Column({ nullable: true })
  defaultTwitterUrl?: string;

  @Column({ nullable: true })
  defaultCurrency?: string;

  @Column({ nullable: true })
  defaultInstagramUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  // * Relations
  @OneToOne(() => User, user => user.seller)
  user: User;
}
