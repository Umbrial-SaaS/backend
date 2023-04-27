import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ProductsController from '../controllers/UsersController';

import { create, id } from './validations/users.validation';

const upload = multer(uploadConfig.multer);

const usersController = new ProductsController();

const usersRouter = Router();

usersRouter.post('/', create, usersController.create);

usersRouter.get('/:id', id, usersController.show);

usersRouter.put(
  '/:id',
  id,
  upload.single('profile_photo'),
  usersController.update,
);

export default usersRouter;
