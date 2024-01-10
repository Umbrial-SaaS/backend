import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import CorporationService from "@modules/v1/corporations/infra/data/entities/CorporationService";

@Entity('services')
export default class Service {
  @PrimaryColumn()
  id: string;

  @Column({ default: false })
  active: boolean;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(() => CorporationService, (service) => service.corporation)
  corporationServices: CorporationService[];
}
