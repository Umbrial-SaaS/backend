/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { FastifyInstance } from 'fastify';
import NotificationPreferencesController from '../controllers/NotificationPreferencesController';

const notificationPreferencesController =
  new NotificationPreferencesController();

export default async function notificationPreferencesRoutes(
  app: FastifyInstance,
) {
  app.put(
    '/',
    { onRequest: [ensureAuthenticated] },
    notificationPreferencesController.update,
  );
}
