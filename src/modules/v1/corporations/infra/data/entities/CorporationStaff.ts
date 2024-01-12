import 'reflect-metadata'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import Corporation from "./Corporation";
import User from "@modules/v1/users/infra/data/entities/User";
import CorporationStaffService from './CorporationStaffService';

@Entity('corporation_staff')
export default class CorporationStaff {
  @PrimaryColumn("uuid")
  id: string;

  @Column("boolean",)
  active: boolean;

  @Column("int",)
  role: number;

  @Column("varchar", { name: 'user_id' })
  userId: string;

  @Column("varchar", { name: 'corporation_id' })
  corporationId: string;

  // Relations
  @ManyToOne(() => Corporation, (corporation) => corporation.corporationStaff)
  @JoinColumn({ name: "corporation_id" })
  corporation: Corporation

  @ManyToOne(() => User, (user) => user.corporationStaff)
  @JoinColumn({ name: "user_id" })
  user: User

  @OneToMany(() => CorporationStaffService, (corporationStaffService) => corporationStaffService.corporationStaff)
  services: CorporationStaffService[];
}
