import usersRoutes from '@modules/v1/users/infra/http/routes/users.routes';
import { server } from '../server';
import corporationsRoutes from '@modules/v1/corporations/infra/http/routes/corporations.routes';

export default function routes() {
  server.register(usersRoutes, {
    prefix: 'v1/users',
  });

  server.register(corporationsRoutes, {
    prefix: 'v1/corporations',
  });

}


