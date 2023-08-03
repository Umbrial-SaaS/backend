/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { server } from '@shared/infra/http/server';
import multer from 'multer';
import ProductsController from '../controllers/ProductsController';

const productsController = new ProductsController();

export default async function productsRoutes(app: any) {
  app.put('/', productsController.updateFiles);

  app.get('/', productsController.list);

  app.patch(
    '/:productId/files',
    { preHandler: server.authenticate },
    productsController.updateFiles,
  );
}
