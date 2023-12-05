export type CreateProductDTO = {
  id: string;
  active: boolean;
  name: string;
  description?: string;
  price: number;
  currency: string;
  isSubstription: boolean;
  corporationId: string;
  periodicity: string;
};
