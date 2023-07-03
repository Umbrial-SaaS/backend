/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

export const createSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  coverUrl: z.string(),
  thumbnailUrl: z.string(),
  cta: z.string(),
  summary: z.string(),
  pricing: z.number(),
  currency: z.string(),
  minimumAmount: z.number(),
  suggestedAmount: z.number(),
  flexPrice: z.boolean(),
  salesLimit: z.number().optional(),
  flexQuantity: z.number().optional(),
  showSalesCount: z.boolean(),
  uniqueKeyLicense: z.boolean(),
  customFields: z.array(
    z.object({
      type: z.string(),
      label: z.string(),
    }),
  ),
});
