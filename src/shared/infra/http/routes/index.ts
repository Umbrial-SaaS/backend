import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
});

routes.use('/users', usersRouter);

export default routes;
