import { FastifyRequest, FastifyReply } from 'fastify';
import UpdateNotificationPreferencesService from '@modules/v1/notifications/services/UpdateNotificationPreferencesService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { updateSchema } from '../routes/validations/notificationPreferences.validation';

export default class NotificationPreferencesController {
  public async update(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const updateNotificationPreferencesService = container.resolve(
      UpdateNotificationPreferencesService,
    );
    const userId = req.user.id;

    const params = updateSchema.parse(req.body);
    const seller = await updateNotificationPreferencesService.execute({
      userId,
      ...params,
    });

    return res.send({ seller: classToClass(seller) });
  }
}
