import Seller from '@modules/v1/sellers/infra/data/entities/Seller';

export default class Product {
  id: string;

  name: string;

  description: string;

  url: string;

  coverUrl: string;

  thumbnailUrl: string;

  cta: string;

  summary: string;

  pricing: number;

  currency: string;

  minimumAmount: number;

  suggestedAmount: number;

  flexPrice: boolean;

  salesLimit: number | null;

  flexQuantity: number | null;

  showSalesCount: boolean;

  uniqueKeyLicense: boolean;

  sellerId: string;
}
