import { getRepository, Repository } from 'typeorm';

import IFindUserDTO from '@modules/v1/users/dtos/IFindUserDTO';
import clearJson from '@shared/functions/clearJson';

import { CreateNotificationPreferenceDTO } from '@modules/v1/notifications/dtos/CreateNotificationPreferenceDTO';
import INotificationPreferencesRepository from '@modules/v1/notifications/repositories/INotifcationPreferencesRepository';
import appDataSource from '@shared/infra/typeorm';
import NotificationPreference from '../entities/NotificationPreference';

class NotificationPreferencesRepository
  implements INotificationPreferencesRepository
{
  private ormRepository: Repository<NotificationPreference>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(NotificationPreference);
  }

  public async index(): Promise<NotificationPreference[]> {
    const data = await this.ormRepository.find({
      order: { createdAt: 'ASC' },
    });
    return data;
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<NotificationPreference | null> {
    return this.ormRepository.findOne({
      where: { id },
      relations,
    });
  }

  public async findBy({
    email,
    phone,
  }: IFindUserDTO): Promise<NotificationPreference | null> {
    return this.ormRepository.findOne({
      where: clearJson({ email, phone }),
    });
  }

  public create(data: CreateNotificationPreferenceDTO): NotificationPreference {
    return this.ormRepository.create(data);
  }

  public async save(
    data: NotificationPreference,
  ): Promise<NotificationPreference> {
    return this.ormRepository.save(data);
  }

  public async insert(data: NotificationPreference): Promise<void> {
    await this.ormRepository.insert(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default NotificationPreferencesRepository;
