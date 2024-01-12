/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyInstance } from 'fastify';
import AppointmentsController from '../controllers/AppointmentsController';
import verifyJwt from '@shared/infra/http/middlewares/ensureAuthenticated';

const appointmentsController = new AppointmentsController();

export default async function appointmentsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, appointmentsController.create);
}
