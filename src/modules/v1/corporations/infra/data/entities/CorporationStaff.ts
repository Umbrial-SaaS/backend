// import { Expose } from "class-transformer";
// import uploadConfig from '@config/upload';
import 'reflect-metadata'
import Product from "@modules/v1/products/infra/data/entities/Product";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import Corporation from "./Corporation";
import User from "@modules/v1/users/infra/data/entities/User";

@Entity('corporations')
export default class CorporationStaff {
  @PrimaryColumn()
  id: string;

  @Column()
  active: boolean;

  @Column()
  role: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'corporation_id' })
  corporationId: string;

  // Relations
  @ManyToOne(() => Corporation, (corporation) => corporation.corporationStaff)
  @JoinColumn({ name: "corporation_id" })
  corporation: Corporation

  @ManyToOne(() => User, (user) => user.corporationStaff)
  @JoinColumn({ name: "user_id" })
  user: User

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
