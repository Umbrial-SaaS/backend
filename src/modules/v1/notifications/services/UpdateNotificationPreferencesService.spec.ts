import FakeUsersRepository from '@modules/v1/users/repositories/fakes/FakeUsersRepository';
import { fakeUserId } from '@modules/v1/users/repositories/fakes/seeds';
import AppError from '@shared/errors/AppError';
import FakeNotificationPreferencesRepository from '../repositories/fakes/FakeNotificationPreferencesRepository';

import UpdateNotificationPreferencesService from './UpdateNotificationPreferencesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeNotificationPreferencesRepository: FakeNotificationPreferencesRepository;

let updateNotificationPreferencesService: UpdateNotificationPreferencesService;

describe('UpdateNotificationPreferencesService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeNotificationPreferencesRepository =
      new FakeNotificationPreferencesRepository();

    updateNotificationPreferencesService =
      new UpdateNotificationPreferencesService(
        fakeNotificationPreferencesRepository,
        fakeUsersRepository,
      );
  });

  it('1. Should be able to create a new user without: email, password and profile_photo.', async () => {
    // ? Arrange

    // ? Act
    const seller = await updateNotificationPreferencesService.execute({
      userId: fakeUserId,
      emailPurchases: true,
      emailRecurringPayments: true,
      emailFreeDownloads: true,
      emailPersonalizedProductAnnoucements: true,
      emailComments: true,
      mobilePurchases: true,
      mobileRecurringPayments: true,
      mobileFreeDownloads: true,
    });

    // ? Assert
    expect(seller.notificationPreferences.emailPurchases).toBe(true);
    expect(seller.notificationPreferences.emailRecurringPayments).toBe(true);
    expect(seller.notificationPreferences.emailFreeDownloads).toBe(true);
    expect(
      seller.notificationPreferences.emailPersonalizedProductAnnoucements,
    ).toBe(true);
    expect(seller.notificationPreferences.emailComments).toBe(true);
    expect(seller.notificationPreferences.mobilePurchases).toBe(true);
    expect(seller.notificationPreferences.mobileRecurringPayments).toBe(true);
    expect(seller.notificationPreferences.mobileFreeDownloads).toBe(true);
  });
  it('2. Should throw error when not found User.', async () => {
    // ? Arrange

    // ? Act
    await expect(
      updateNotificationPreferencesService.execute({
        userId: 'non-valid-userId',
        emailPurchases: true,
        emailRecurringPayments: true,
        emailFreeDownloads: true,
        emailPersonalizedProductAnnoucements: true,
        emailComments: true,
        mobilePurchases: true,
        mobileRecurringPayments: true,
        mobileFreeDownloads: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
