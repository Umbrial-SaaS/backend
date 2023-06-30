import { CreateNotificationPreferenceDTO } from '../dtos/CreateNotificationPreferenceDTO';
import NotificationPreference from '../infra/typeorm/entities/NotificationPreference';

export default interface INotificationPreferencesRepository {
  index(): Promise<NotificationPreference[]>;
  findById(
    id: string,
    relations?: string[],
  ): Promise<NotificationPreference | null>;
  create(data: CreateNotificationPreferenceDTO): NotificationPreference;
  save(data: NotificationPreference): Promise<NotificationPreference>;
  delete(id: string): Promise<void>;
}
