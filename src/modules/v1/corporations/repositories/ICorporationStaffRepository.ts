import { CreateCorporationStaffDTO } from '../dtos/CreateCorporationStaffDTO';
import CorporationStaff from '../infra/data/entities/CorporationStaff';

export default interface ICorporationStaffStaffRepository {
  create(product: CreateCorporationStaffDTO): CorporationStaff;
  findByUserAndCorporation(userId: string, corporationId: string): Promise<CorporationStaff | undefined>;
  save(product: CorporationStaff): Promise<void>;
}
