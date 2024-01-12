import ICorporationsRepository from '../ICorporationsRepository';
import Corporation from '../../infra/data/entities/Corporation';
import { CreateCorporationDTO } from '../../dtos/CreateCorporationDTO';
import { fakeCorporation } from './seeds';

class FakeCorporationsRepository implements ICorporationsRepository {

  private corporations: Corporation[] = [fakeCorporation];

  public async findById(id: string, relations?: string[]): Promise<Corporation | null> {
    return this.corporations.find(corporation => corporation.id === id) || null;
  }

  async showById(id: string): Promise<Corporation | null> {
    const corporation = this.corporations.find(corporation => corporation.id === id) || null;
    return corporation
  }

  public async index(): Promise<Corporation[]> {
    return this.corporations;
  }

  public create(corporationData: CreateCorporationDTO): Corporation {
    const corporation = new Corporation();
    Object.assign(corporation, corporationData);

    return corporation || null;
  }

  public async save(corporation: Corporation): Promise<void> {
    this.corporations.push(corporation)
  }
}

export default FakeCorporationsRepository;
