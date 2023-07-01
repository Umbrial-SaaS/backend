import NotificationPreference from '@modules/v1/notifications/infra/data/entities/NotificationPreference';
import { fakeSellerId } from '@modules/v1/sellers/repositories/fakes/seeds';

const fakeNotificationPreferenceId = 'asdas';

const fakeNotificationPreferences = new NotificationPreference();

Object.assign(fakeNotificationPreferences, {
  id: fakeNotificationPreferenceId,
  emailPurchases: false,
  emailRecurringPayments: false,
  emailFreeDownloads: false,
  emailPersonalizedProductAnnoucements: false,
  emailComments: false,
  mobilePurchases: false,
  mobileRecurringPayments: false,
  mobileFreeDownloads: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  sellerId: fakeSellerId,
});

export { fakeNotificationPreferences, fakeNotificationPreferenceId };
