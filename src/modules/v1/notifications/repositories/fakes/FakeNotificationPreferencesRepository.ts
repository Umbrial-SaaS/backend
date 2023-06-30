import { CreateNotificationPreferenceDTO } from '@modules/v1/notifications/dtos/CreateNotificationPreferenceDTO';
import NotificationPreference from '@modules/v1/notifications/infra/typeorm/entities/NotificationPreference';
import INotificationPreferencesRepository from '../INotifcationPreferencesRepository';
import { fakeNotificationPreferences } from './seeds';

class FakeNotificationPreferencesRepository
  implements INotificationPreferencesRepository
{
  private data: NotificationPreference[] = [fakeNotificationPreferences];

  public async index(): Promise<NotificationPreference[]> {
    return this.data;
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<NotificationPreference | null> {
    const user = this.data.find(item => item.id === id);

    return user || null;
  }

  public create(data: CreateNotificationPreferenceDTO): NotificationPreference {
    const user = new NotificationPreference();
    Object.assign(user, data);

    this.data.push(user);

    return user;
  }

  public async save(
    user: NotificationPreference,
  ): Promise<NotificationPreference> {
    this.data.push(user);
    return user;
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.data.findIndex(item => item.id === id);

    this.data.splice(userIndex, 1);
  }
}

export default FakeNotificationPreferencesRepository;
