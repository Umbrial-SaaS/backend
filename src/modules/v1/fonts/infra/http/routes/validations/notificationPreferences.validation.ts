/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

export const updateSchema = z.object({
  emailPurchases: z.boolean(),
  emailRecurringPayments: z.boolean(),
  emailFreeDownloads: z.boolean(),
  emailPersonalizedProductAnnoucements: z.boolean(),
  emailComments: z.boolean(),
  mobilePurchases: z.boolean(),
  mobileRecurringPayments: z.boolean(),
  mobileFreeDownloads: z.boolean(),
});
