export type CreateNotificationPreferenceDTO = {
  id: string;
  emailPurchases?: boolean;
  emailRecurringPayments?: boolean;
  emailFreeDownloads?: boolean;
  emailPersonalizedProductAnnoucements?: boolean;
  emailComments?: boolean;
  mobilePurchases?: boolean;
  mobileRecurringPayments?: boolean;
  mobileFreeDownloads?: boolean;
};
