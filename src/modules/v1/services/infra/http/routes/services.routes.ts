import ProductsController from '../controllers/ProductsController';

const servicesController = new ProductsController();

export default async function servicesRoutes(app: any) {
  app.get('/', servicesController.list);
}
