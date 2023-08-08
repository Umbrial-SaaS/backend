import { Expose } from "class-transformer";
import { Column, Entity, PrimaryColumn } from "typeorm";
import uploadConfig from '@config/upload';
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
  coverUrl?: string;

  @Column()
  thumbnailUrl?: string;

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

  @Expose({ name: 'coverUrl' })
  getCoverUrl(): string | null {
    console.log({ cover: this.coverUrl })
    if (this.coverUrl) {
      switch (uploadConfig.driver) {
        case 'disk':
          return `${process.env.APP_API_URL}/files/${this.coverUrl}`;
        case 's3':
          return `https://${uploadConfig.config.aws.bucket}.${process.env.S3_ENDPOINT}/${this.coverUrl}`;
        default:
          return null;
      }
    } else {
      return null
    }


  }

  @Expose({ name: 'thumbnailUrl' })
  getThumbnailUrl(): string | null {
    console.log({ cover: this.thumbnailUrl })
    if (this.thumbnailUrl) {
      switch (uploadConfig.driver) {
        case 'disk':
          return `${process.env.APP_API_URL}/files/${this.thumbnailUrl}`;
        case 's3':
          return `https://${uploadConfig.config.aws.bucket}.${process.env.S3_ENDPOINT}/${this.thumbnailUrl}`;
        default:
          return null;
      }
    } else {
      return null
    }


  }
}
