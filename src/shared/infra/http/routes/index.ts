import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import { server } from '../server';

server.register(usersRoutes, {
  prefix: 'users',
});
