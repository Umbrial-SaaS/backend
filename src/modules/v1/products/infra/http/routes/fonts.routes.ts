/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyInstance } from 'fastify';
import FontsController from '../controllers/FontsController';

const fontsController = new FontsController();

export default async function fontsRoutes(app: FastifyInstance) {
  app.get('/', fontsController.list);
}
