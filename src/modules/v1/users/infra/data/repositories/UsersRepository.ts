import IFindUserDTO from '@modules/v1/users/dtos/IFindUserDTO';
import clearJson from '@shared/functions/clearJson';
import prisma from '@shared/infra/prisma';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateProductDTO from '../../../dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  async findByPhone(phone: string, relations?: string[]): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: { phone },
    });

    return data ? Object.assign(new User(), data) : null;
  }

  async findByEmail(email: string, relations?: string[]): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: { email },
    });

    return data ? Object.assign(new User(), data) : null;
  }

  public async findById(id: string, sasdas?: string[]): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: { id },
    });

    return data ? Object.assign(new User(), data) : null;
  }

  public async findBy({ email, phone }: IFindUserDTO): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: clearJson({ email, phone }),
    });

    return data ? Object.assign(new User(), data) : null;
  }

  public create(user: ICreateProductDTO): User {
    return Object.assign(new User(), {
      ...user,
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date(),
    });
  }

  public async save(data: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
        phone: data.phone,
        bio: data.bio,
        email: data.email,
        googleId: data.googleId,
        facebookId: data.facebookId,
        avatar: data.avatar,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
        seller: {
          create: {
            id: data.seller.id,
            createdAt: data.seller.createdAt,
            updatedAt: data.seller.updatedAt,
            defaultCurrency: data.seller.defaultCurrency,
            defaultInstagramUrl: data.seller.defaultInstagramUrl,
            defaultSupportEmail: data.seller.defaultSupportEmail,
            defaultTwitterUrl: data.seller.defaultTwitterUrl,
            deletedAt: data.seller.deletedAt,
            notificationPreference: {
              create: {
                createdAt: data.seller.notificationPreferences.createdAt,
                emailComments:
                  data.seller.notificationPreferences.emailComments,
                emailFreeDownloads:
                  data.seller.notificationPreferences.emailFreeDownloads,
                emailPersonalizedProductAnnoucements:
                  data.seller.notificationPreferences
                    .emailPersonalizedProductAnnoucements,
                emailPurchases:
                  data.seller.notificationPreferences.emailPurchases,
                emailRecurringPayments:
                  data.seller.notificationPreferences.emailRecurringPayments,
                id: data.seller.notificationPreferences.id,
                mobileFreeDownloads:
                  data.seller.notificationPreferences.mobileFreeDownloads,
                mobilePurchases:
                  data.seller.notificationPreferences.mobilePurchases,
                mobileRecurringPayments:
                  data.seller.notificationPreferences.mobileRecurringPayments,
                updatedAt: data.seller.notificationPreferences.updatedAt,
              },
            },
          },
        },
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}

export default UsersRepository;
