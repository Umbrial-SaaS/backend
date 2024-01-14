import { CreateCorporationStaffServiceDTO } from '../dtos/CreateCorporationStaffServiceDTO';
import CorporationStaffService from '../infra/data/entities/CorporationStaffService';

export default interface ICorporationStaffServicesRepository {
  create(product: CreateCorporationStaffServiceDTO): CorporationStaffService;
  save(product: CorporationStaffService): Promise<void>;
}
