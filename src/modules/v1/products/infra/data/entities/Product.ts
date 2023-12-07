import 'reflect-metadata'
import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import uploadConfig from '@config/upload';
import Corporation from "@modules/v1/corporations/infra/data/entities/Corporation";

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

  @Column("varchar", { name: "corporation_id" })
  corporationId: string;

  // ? RelationsF
  @ManyToOne(() => Corporation, (corporation) => corporation.products, { cascade: true, onDelete: 'CASCADE', })
  @JoinColumn({ name: 'corporation_id' })
  corporation: Corporation;

  // @Expose({ name: 'coverUrl' })
  // getCoverUrl(): string | null {
  //   console.log({ cover: this.coverUrl })
  //   if (this.coverUrl) {
  //     switch (uploadConfig.driver) {
  //       case 'disk':
  //         return `${process.env.APP_API_URL}/files/${this.coverUrl}`;
  //       case 's3':
  //         return `https://${uploadConfig.config.aws.bucket}.${process.env.S3_ENDPOINT}/${this.coverUrl}`;
  //       default:
  //         return null;
  //     }
  //   } else {
  //     return null
  //   }
  // }

  // @Expose({ name: 'thumbnailUrl' })
  // getThumbnailUrl(): string | null {
  //   console.log({ cover: this.thumbnailUrl })
  //   if (this.thumbnailUrl) {
  //     switch (uploadConfig.driver) {
  //       case 'disk':
  //         return `${process.env.APP_API_URL}/files/${this.thumbnailUrl}`;
  //       case 's3':
  //         return `https://${uploadConfig.config.aws.bucket}.${process.env.S3_ENDPOINT}/${this.thumbnailUrl}`;
  //       default:
  //         return null;
  //     }
  //   } else {
  //     return null
  //   }


  // }
}
