import { UpdateSellerReqDTO } from '@modules/v1/sellers/dtos/UpdateSellerDTO';
import Seller from '@modules/v1/sellers/infra/typeorm/entities/Seller';
import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import INotificationPreferencesRepository from '../repositories/INotifcationPreferencesRepository';

export type UpdateNotificationPreferencesServiceReq = {
  emailPurchases: boolean;
  emailRecurringPayments: boolean;
  emailFreeDownloads: boolean;
  emailPersonalizedProductAnnoucements: boolean;
  emailComments: boolean;
  mobilePurchases: boolean;
  mobileRecurringPayments: boolean;
  mobileFreeDownloads: boolean;
  userId: string;
};

@injectable()
class UpdateNotificationPreferencesService {
  constructor(
    @inject('NotifcationPreferencesRepository')
    private notificationPreferencesRepository: INotificationPreferencesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    emailPurchases,
    emailRecurringPayments,
    emailFreeDownloads,
    emailPersonalizedProductAnnoucements,
    emailComments,
    mobilePurchases,
    mobileRecurringPayments,
    mobileFreeDownloads,
    userId,
  }: UpdateNotificationPreferencesServiceReq): Promise<Seller> {
    const user = await this.usersRepository.findById(userId, [
      'seller',
      'seller.notificationPreferences',
    ]);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404, 'user_not_found');
    }
    const { seller } = user;

    seller.notificationPreferences.emailPurchases = emailPurchases;
    seller.notificationPreferences.emailRecurringPayments =
      emailRecurringPayments;
    seller.notificationPreferences.emailFreeDownloads = emailFreeDownloads;
    seller.notificationPreferences.emailComments = emailComments;
    seller.notificationPreferences.mobilePurchases = mobilePurchases;
    seller.notificationPreferences.mobileRecurringPayments =
      mobileRecurringPayments;
    seller.notificationPreferences.mobileFreeDownloads = mobileFreeDownloads;
    seller.notificationPreferences.emailPersonalizedProductAnnoucements =
      emailPersonalizedProductAnnoucements;

    await this.notificationPreferencesRepository.save(
      seller.notificationPreferences,
    );

    return seller;
  }
}

export default UpdateNotificationPreferencesService;
