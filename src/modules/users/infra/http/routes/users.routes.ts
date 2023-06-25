/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { randomUUID } from 'crypto';
import { FastifyInstance } from 'fastify';
import { server } from '@shared/infra/http/server';
import UsersController from '../controllers/UsersController';

import { create, id, auth } from './validations/users.validation';

const upload = multer(uploadConfig.multer);

const usersController = new UsersController();

export default async function userRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: server.authenticate }, usersController.create);

  app.get('/:userId', usersController.show);

  app.get('/', usersController.find);

  app.post('/auth', usersController.auth);

  // app.put(
  //   '/',
  //   ensureAuthenticated,
  //   upload.single('profile_photo'),
  //   usersController.update,
  // );
}
