import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('products')
export default class Product {
  @PrimaryColumn()
  id: string;

  @Column({ default: false })
  active: boolean;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  coverUrl: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  cta: string;

  @Column()
  summary: string;

  @Column()
  pricing: number;

  @Column()
  currency: string;

  @Column()
  minimumAmount: number;

  @Column({ nullable: true })
  suggestedAmount: number;

  @Column()
  flexPrice: boolean;

  @Column({ nullable: true })
  salesLimit?: number

  @Column()
  flexQuantity: boolean

  @Column()
  showSalesCount: boolean;

  @Column()
  uniqueKeyLicense: boolean;

  @Column()
  sellerId: string;
}
