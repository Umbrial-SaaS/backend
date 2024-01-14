import verifyJwt from '@shared/infra/http/middlewares/ensureAuthenticated';
import CorporationServicesController from '../controllers/CorporationServicesController';
import productsRoutes from '@modules/v1/products/infra/http/routes/products.routes';
import appointmentsRoutes from '@modules/v1/appointments/infra/http/routes/appointments.routes';

const corporationServicesController = new CorporationServicesController();

export default async function corporationServicesRoutes(app: any) {
  app.post(
    '/',
    { onRequest: [verifyJwt] },
    corporationServicesController.create,
  );
}
