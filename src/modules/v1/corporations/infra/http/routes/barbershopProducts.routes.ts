/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { server } from '@shared/infra/http/server';
import multer from 'multer';
import verifyJwt from '@shared/infra/http/middlewares/ensureAuthenticated';
import CorporationsController from '../controllers/CorporationsController';
import ProductsController from '@modules/v1/products/infra/http/controllers/ProductsController';

const corporationsController = new CorporationsController();
const productsController = new ProductsController();

export default async function corporationProductsRoutes(app: any) {
  app.put('/', corporationsController.updateFiles);

  app.get('/', corporationsController.list);

  app.post('/:corporationId/products',
    { onRequest: [verifyJwt] },
    productsController.create
  );

  app.patch(
    '/:corporationId/files',
    { onRequest: [verifyJwt] },
    corporationsController.updateFiles,
  );
}
