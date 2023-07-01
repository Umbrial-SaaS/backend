import { CreateNotificationPreferenceDTO } from '@modules/v1/notifications/dtos/CreateNotificationPreferenceDTO';
import prisma from '@shared/infra/prisma';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime';
import INotificationPreferencesRepository from '@modules/v1/notifications/repositories/INotificationPreferencesRepository';
import NotificationPreference from '../entities/NotificationPreference';

class NotificationPreferencesRepository
  implements INotificationPreferencesRepository
{
  private ormRepository: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
    DefaultArgs
  >;

  constructor() {
    this.ormRepository = prisma;
  }

  public create(data: CreateNotificationPreferenceDTO): NotificationPreference {
    const notificationPreference = new NotificationPreference();
    Object.assign(notificationPreference);
    return notificationPreference;
  }

  public async save(data: NotificationPreference): Promise<void> {
    await this.ormRepository.notificationPreference.create({
      data: {
        id: data.id,
        emailPurchases: data.emailPurchases,
        emailRecurringPayments: data.emailRecurringPayments,
        emailFreeDownloads: data.emailFreeDownloads,
        emailPersonalizedProductAnnoucements:
          data.emailPersonalizedProductAnnoucements,
        emailComments: data.emailComments,
        mobilePurchases: data.mobilePurchases,
        mobileRecurringPayments: data.mobileRecurringPayments,
        mobileFreeDownloads: data.mobileFreeDownloads,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        sellerId: data.sellerId,
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.notificationPreference.delete({
      where: {
        id,
      },
    });
  }
}

export default NotificationPreferencesRepository;
