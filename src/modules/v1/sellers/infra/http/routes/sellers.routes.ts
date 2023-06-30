/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyInstance } from 'fastify';
import notificationPreferencesRoutes from '@modules/v1/notifications/infra/http/routes/notificationPreferences.routes';
import SellersController from '../controllers/SellersController';

const sellersController = new SellersController();

export default async function sellerRoutes(app: FastifyInstance) {
  app.post('/', sellersController.create);

  app.put('/', sellersController.update);

  app.register(notificationPreferencesRoutes, {
    prefix: '/notificationsPreferences',
  });
}
