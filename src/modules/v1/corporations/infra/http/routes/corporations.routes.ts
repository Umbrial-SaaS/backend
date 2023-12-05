/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { server } from '@shared/infra/http/server';
import multer from 'multer';
import verifyJwt from '@shared/infra/http/middlewares/ensureAuthenticated';
import CorporationsController from '../controllers/CorporationsController';
import productsRoutes from '@modules/v1/products/infra/http/routes/products.routes';

const corporationsController = new CorporationsController();

export default async function corporationsRoutes(app: any) {
  app.put('/', corporationsController.updateFiles);

  app.get('/', corporationsController.list);

  app.get('/:corporationId', corporationsController.show);

  app.post('/', { onRequest: [verifyJwt] },
    corporationsController.create);

  app.register(productsRoutes, {
    prefix: '/:corporationId/products',
  });

  app.patch(
    '/:corporationId/files',
    { onRequest: [verifyJwt] },
    corporationsController.updateFiles,
  );
}
