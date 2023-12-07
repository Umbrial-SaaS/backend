import 'reflect-metadata'
import Seller from '@modules/v1/sellers/infra/data/entities/Seller';

export default class NotificationPreference {
  id: string;

  emailPurchases: boolean;

  emailRecurringPayments: boolean;

  emailFreeDownloads: boolean;

  emailPersonalizedProductAnnoucements: boolean;

  emailComments: boolean;

  mobilePurchases: boolean;

  mobileRecurringPayments: boolean;

  mobileFreeDownloads: boolean;

  createdAt: Date;

  updatedAt: Date;

  sellerId: string;

  // * Relations
  seller: Seller;
}
