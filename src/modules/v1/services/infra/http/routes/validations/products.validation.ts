/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

export const createSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  currency: z.string(),
  active: z.boolean(),
  corporationId: z.string(),
  periodicity: z.string(),
  isSubstription: z.boolean(),
});
