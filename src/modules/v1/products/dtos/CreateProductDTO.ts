export type CreateProductDTO = {
  id: string;
  name: string;
  description: string;
  url: string;
  coverUrl?: string;
  thumbnailUrl?: string;
  cta: string;
  summary: string;
  pricing: number;
  currency: string;
  minimumAmount?: number;
  suggestedAmount?: number;
  flexPrice: boolean;
  salesLimit?: number;
  flexQuantity?: number;
  showSalesCount: boolean;
  uniqueKeyLicense: boolean;

  sellerId: string;

  customFields: {
    label: string;
    type: string;
  }[];
};
