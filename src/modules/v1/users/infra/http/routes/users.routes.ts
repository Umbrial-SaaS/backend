/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyInstance } from 'fastify';
import { server } from '@shared/infra/http/server';
import UsersController from '../controllers/UsersController';

// const upload = multer(uploadConfig.multer);

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
