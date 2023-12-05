import { CreateCorporationDTO } from '../dtos/CreateCorporationDTO';
import Corporation from '../infra/data/entities/Corporation';

export default interface ICorporationsRepository {
  findById(id: string, relations?: string[]): Promise<Corporation | null>;
  index(): Promise<Corporation[]>;
  create(product: CreateCorporationDTO): Corporation;
  save(product: Corporation): Promise<void>;
}
