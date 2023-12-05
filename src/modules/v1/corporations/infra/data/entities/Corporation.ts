// import { Expose } from "class-transformer";
// import uploadConfig from '@config/upload';
import Product from "@modules/v1/products/infra/data/entities/Product";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import CorporationService from "./CorporationService";
import CorporationStaff from "./CorporationStaff";

@Entity('corporations')
export default class Corporation {
  @PrimaryColumn()
  id: string;

  @Column({ default: false })
  active: boolean;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  instagram: string;

  // Relations
  @OneToMany(() => Product, (product) => product.corporation, { onDelete: 'CASCADE' })
  products: Product[];

  @OneToMany(() => CorporationService, (service) => service.corporation)
  services: CorporationService[];

  @OneToMany(() => CorporationStaff, (corporationStaff) => corporationStaff.corporation)
  corporationStaff: CorporationStaff[];

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
