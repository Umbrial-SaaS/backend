/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

export const createSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  url: z.string().optional(),
  cta: z.string().optional(),
  summary: z.string().optional(),
  currency: z.string().optional(),
  minimumAmount: z.number().optional().nullable(),
  suggestedAmount: z.number().optional().nullable(),
  salesLimit: z.number().optional().nullable(),
  flexPrice: z.boolean().optional(),
  flexQuantity: z.boolean().optional(),
  showSalesCount: z.boolean().optional(),
  uniqueKeyLicense: z.boolean().optional(),
  customFields: z.array(
    z.object({
      type: z.string(),
      label: z.string(),
    })
  ).optional(),
});
