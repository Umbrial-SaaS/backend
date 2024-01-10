import 'reflect-metadata'
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import Corporation from "./Corporation";
import Person from '@modules/v1/users/infra/data/entities/Person';

@Entity('corporation_customers')
export default class CorporationCustomer {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  personId: string;

  @Column("varchar", { name: 'corporation_id' })
  corporationId: string;

  // Relations
  @ManyToOne(() => Corporation, (corporation) => corporation.customers)
  corporation: Corporation

  @ManyToOne(() => Person, (person) => person.corporationCustomers)
  person: Person
}
