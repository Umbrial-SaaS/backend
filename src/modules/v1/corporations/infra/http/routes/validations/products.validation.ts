/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

export const createSchema = z.object({
  active: z.boolean(),
  name: z.string(),
  description: z.string(),
  instagram: z.string(),
}); 