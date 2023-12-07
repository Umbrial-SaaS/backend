import 'reflect-metadata'

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

}
