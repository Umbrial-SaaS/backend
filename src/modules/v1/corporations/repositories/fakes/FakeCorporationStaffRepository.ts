import CorporationStaff from '../../infra/data/entities/CorporationStaff';
import ICorporationStaffStaffRepository from '../ICorporationStaffRepository';
import { CreateCorporationStaffDTO } from '../../dtos/CreateCorporationStaffDTO';

class FakeCorporationStaffRepository implements ICorporationStaffStaffRepository {
  findByUserAndCorporation(userId: string, corporationId: string): Promise<CorporationStaff> {
    throw new Error('Method not implemented.');
  }
  private corporations: CorporationStaff[] = [];

  public async findById(id: string, relations?: string[]): Promise<CorporationStaff | null> {
    return this.corporations.find(corporation => corporation.id === id) || null;
  }

  public async index(): Promise<CorporationStaff[]> {
    return this.corporations;
  }

  public create(corporationStaffDTO: CreateCorporationStaffDTO): CorporationStaff {
    const corporation = new CorporationStaff();
    Object.assign(corporation, corporationStaffDTO);

    return corporation || null;
  }

  public async save(corporation: CorporationStaff): Promise<void> {
    this.corporations.push(corporation)
  }
}

export default FakeCorporationStaffRepository;
