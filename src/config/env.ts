/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JS_OR_TS: z.string(),
});
console.log(envSchema.parse(process.env));
export const env = envSchema.parse(process.env);
