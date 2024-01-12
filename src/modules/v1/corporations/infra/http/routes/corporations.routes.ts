import verifyJwt from '@shared/infra/http/middlewares/ensureAuthenticated';
import CorporationsController from '../controllers/CorporationsController';
import productsRoutes from '@modules/v1/products/infra/http/routes/products.routes';
import appointmentsRoutes from '@modules/v1/appointments/infra/http/routes/appointments.routes';

const corporationsController = new CorporationsController();

export default async function corporationsRoutes(app: any) {
  app.put('/', corporationsController.updateFiles);

  app.get('/', corporationsController.list);

  app.get('/:corporationId', corporationsController.show);

  app.post('/', { onRequest: [verifyJwt] },
    corporationsController.create);

  app.register(productsRoutes, {
    prefix: '/:corporationId/products',
  });

  app.register(appointmentsRoutes, {
    prefix: '/:corporationId/staff/:corporationStaffId/appointments',
  });

  app.patch(
    '/:corporationId/files',
    { onRequest: [verifyJwt] },
    corporationsController.updateFiles,
  );
}
