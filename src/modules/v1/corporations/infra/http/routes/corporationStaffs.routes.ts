import verifyJwt from "@shared/infra/http/middlewares/ensureAuthenticated";
import CorporationStaffsController from "../controllers/CorporationStaffsController";

const corporationStaffsController = new CorporationStaffsController();

export default async function corporationStaffsRouter(app: any) {
  app.post(
    '/',
    { onRequest: [verifyJwt] },
    corporationStaffsController.create,
  );
}
