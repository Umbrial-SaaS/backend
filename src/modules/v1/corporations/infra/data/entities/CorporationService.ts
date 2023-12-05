// import { Expose } from "class-transformer";
// import uploadConfig from '@config/upload';
import Product from "@modules/v1/products/infra/data/entities/Product";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import Corporation from "./Corporation";

@Entity('corporations')
export default class CorporationService {
  @PrimaryColumn()
  id: string;

  @Column()
  active: boolean;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  duration: string;

  @Column({ name: 'corporation_id' })
  corporationId: string;

  // Relations
  @ManyToOne(() => Corporation, (corporation) => corporation.services)
  corporation: Corporation

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
