/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { server } from '@shared/infra/http/server';
import multer from 'multer';
import verifyJwt from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsController = new ProductsController();

export default async function productsRoutes(app: any) {
  app.put('/', productsController.updateFiles);

  app.get('/', productsController.list);

  app.get('/:productId', productsController.show);

  app.post('/', { onRequest: [verifyJwt] }, productsController.create);

  app.patch(
    '/:productId/files',
    { onRequest: [verifyJwt] },
    productsController.updateFiles,
  );
}
