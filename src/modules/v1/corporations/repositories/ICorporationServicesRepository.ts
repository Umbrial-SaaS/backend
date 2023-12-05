import { CreateCorporationDTO } from '../dtos/CreateCorporationDTO';
import { CreateCorporationServiceDTO } from '../dtos/CreateCorporationServiceDTO';
import CorporationService from '../infra/data/entities/CorporationService';

export default interface ICorporationServicesRepository {
  findById(id: string, relations?: string[]): Promise<CorporationService | null>;
  create(product: CreateCorporationServiceDTO): CorporationService;
  save(product: CorporationService): Promise<void>;
}
