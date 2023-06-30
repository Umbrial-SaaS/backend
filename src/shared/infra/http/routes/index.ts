import usersRoutes from '@modules/v1/users/infra/http/routes/users.routes';
import { server } from '../server';

server.register(usersRoutes, {
  prefix: 'users',
});
