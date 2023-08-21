/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

export const createSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  cta: z.string(),
  summary: z.string(),
  pricing: z.number(),
  currency: z.string(),
  minimumAmount: z.number().optional().nullable(),
  suggestedAmount: z.number().optional().nullable(),
  salesLimit: z.number().optional().nullable(),
  flexPrice: z.boolean(),
  flexQuantity: z.boolean(),
  showSalesCount: z.boolean(),
  uniqueKeyLicense: z.boolean(),
  customFields: z.array(
    z.object({
      type: z.string(),
      label: z.string(),
    }),
  ),
});
