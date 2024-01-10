/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JS_OR_TS: z.string(),
  JWT_SECRET: z.string(),
  // AWS_BUCKET_NAME: z.string(),
  // GOOGLE_CLIENT_ID: z.string(),
  // GOOGLE_SECRET_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
