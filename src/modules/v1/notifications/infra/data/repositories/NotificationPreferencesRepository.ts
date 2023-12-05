import { CreateNotificationPreferenceDTO } from '@modules/v1/notifications/dtos/CreateNotificationPreferenceDTO';

import INotificationPreferencesRepository from '@modules/v1/notifications/repositories/INotificationPreferencesRepository';
import NotificationPreference from '../entities/NotificationPreference';
import { Repository } from 'typeorm';
import AppDataSource from '@shared/infra/typeorm';

class NotificationPreferencesRepository
  implements INotificationPreferencesRepository {
  private ormRepository: Repository<NotificationPreference>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(NotificationPreference);
  }

  public create(data: CreateNotificationPreferenceDTO): NotificationPreference {
    const notificationPreference = new NotificationPreference();
    Object.assign(notificationPreference, data);
    return notificationPreference;
  }

  public async save(data: NotificationPreference): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default NotificationPreferencesRepository;
