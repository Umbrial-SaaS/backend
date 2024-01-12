// import { Expose } from "class-transformer";
// import uploadConfig from '@config/upload';
import 'reflect-metadata'
import Product from "@modules/v1/products/infra/data/entities/Product";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import Corporation from "./Corporation";
import Service from '@modules/v1/services/infra/data/entities/Service';
import CorporationStaff from './CorporationStaff';

@Entity('corporation__staff_services')
export default class CorporationStaffService {
  @PrimaryColumn("uuid")
  id: string;

  @Column("boolean")
  active: boolean;

  @Column("varchar")
  price: string;

  @Column("varchar")
  duration: string;

  @Column("varchar", { name: 'corporation__staff_id' })
  corporationStaffId: string;

  @Column("varchar", { name: 'service_id' })
  serviceId: string;

  // Relations
  @ManyToOne(() => CorporationStaff, (corporationStaff) => corporationStaff.services)
  @JoinColumn({ name: 'corporation_staff_id' })
  corporationStaff: CorporationStaff

  @ManyToOne(() => Service, (service) => service.corporationServices)
  @JoinColumn({ name: 'service_id' })
  service: Service

}
