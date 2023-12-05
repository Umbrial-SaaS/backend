import { ICreatePlanGalaxPayProvider } from "../dtos/IGalaxPayProvider";

export default interface IGalaxPayProvider {
  createPlan(data: ICreatePlanGalaxPayProvider): Promise<any>;
}
