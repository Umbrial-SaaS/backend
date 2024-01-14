import 'reflect-metadata'
import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"; 

@Entity('products')
export default class Product {
  @PrimaryColumn("uuid")
  id: string;

  @Column("boolean", { default: false })
  active: boolean;

  @Column("varchar")
  name: string;

  @Column("varchar")
  description: string;

  @Column("int")
  price: number;

  @Column("varchar")
  periodicity: string;

  @Column("varchar")
  currency: string;

  @Column("boolean", { name: "is_subscription" })
  isSubstription: boolean;
}
