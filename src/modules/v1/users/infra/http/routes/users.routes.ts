/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyInstance } from 'fastify';
import { server } from '@shared/infra/http/server';
import multer from 'multer';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

export default async function userRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: server.authenticate }, usersController.create);

  app.get('/:userId', usersController.show);

  app.get('/', usersController.find);

  app.post('/auth', usersController.auth);

  app.post('/auth/google', usersController.googleAuth);

  // app.put(
  //   '/',
  //   ensureAuthenticated,
  //   upload.single('profile_photo'),
  //   usersController.update,
  // );
}
