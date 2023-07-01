import { CreateNotificationPreferenceDTO } from '../dtos/CreateNotificationPreferenceDTO';
import NotificationPreference from '../infra/data/entities/NotificationPreference';

export default interface INotificationPreferencesRepository {
  create(data: CreateNotificationPreferenceDTO): NotificationPreference;
  save(data: NotificationPreference): Promise<void>;
  delete(id: string): Promise<void>;
}
