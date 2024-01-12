import 'reflect-metadata'
import Product from "@modules/v1/products/infra/data/entities/Product";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import CorporationService from "./CorporationService";
import CorporationStaff from "./CorporationStaff";
import CorporationCustomer from './CorporationCustomer';

@Entity('corporations')
export default class Corporation {
  @PrimaryColumn("uuid")
  id: string;

  @Column("boolean", { default: false })
  active: boolean;

  @Column("varchar",)
  name: string;

  @Column("varchar",)
  description: string;

  @Column("varchar",)
  instagram: string;

  // Relations
  @OneToMany(() => Product, (product) => product.corporation, { onDelete: 'CASCADE' })
  products: Product[];

  @OneToMany(() => CorporationService, (service) => service.corporation)
  services: CorporationService[];

  @OneToMany(() => CorporationCustomer, (corporationCustomer) => corporationCustomer.corporation)
  customers: CorporationCustomer[];

  @OneToMany(() => CorporationStaff, (corporationStaff) => corporationStaff.corporation)
  corporationStaff: CorporationStaff[];

}
