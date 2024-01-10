// import { Expose } from "class-transformer";
// import uploadConfig from '@config/upload';
import 'reflect-metadata'
import Product from "@modules/v1/products/infra/data/entities/Product";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import Corporation from "./Corporation";
import Service from '@modules/v1/services/infra/data/entities/Service';

@Entity('corporations')
export default class CorporationService {
  @PrimaryColumn("uuid")
  id: string;

  @Column("boolean")
  active: boolean;

  @Column("varchar")
  name: string;

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
