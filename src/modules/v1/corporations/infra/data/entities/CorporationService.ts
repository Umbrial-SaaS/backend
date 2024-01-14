// import { Expose } from "class-transformer";
// import uploadConfig from '@config/upload';
import 'reflect-metadata'
import Product from "@modules/v1/products/infra/data/entities/Product";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import Corporation from "./Corporation";
import Service from '@modules/v1/services/infra/data/entities/Service';

@Entity('corporation_services')
export default class CorporationService {
  @PrimaryColumn("uuid")
  id: string;

  @Column("boolean")
  active: boolean;

  @Column("varchar",)
  price: string;

  @Column("varchar",)
  duration: string;

  @Column("varchar", { name: 'corporation_id' })
  corporationId: string;

  @Column("varchar", { name: 'service_id' })
  serviceId: string;

  // Relations
  @ManyToOne(() => Corporation, (corporation) => corporation.services)
  @JoinColumn({ name: 'corporation_id' })
  corporation: Corporation

  @ManyToOne(() => Service, (service) => service.corporationServices)
  @JoinColumn({ name: 'service_id' })
  service: Service
}
