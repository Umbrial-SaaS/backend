/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { FastifyInstance } from 'fastify';
import SellersController from '../controllers/SellersController';

import { create } from './validations/sellers.validation';

const upload = multer(uploadConfig.multer);

const sellersController = new SellersController();

export default async function sellerRoutes(app: FastifyInstance) {
  app.post('/', sellersController.create);

  app.put('/', sellersController.update);
}
