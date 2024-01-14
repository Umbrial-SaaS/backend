import ICorporationStaffServicesRepository from '@modules/v1/corporations/repositories/ICorporationStaffServicesRepository';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import CorporationStaffService from '../entities/CorporationStaffService';
import { CreateCorporationStaffServiceDTO } from '@modules/v1/corporations/dtos/CreateCorporationStaffServiceDTO';

class CorporationStaffServicesRepository implements ICorporationStaffServicesRepository {
  private ormRepository: Repository<CorporationStaffService>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(CorporationStaffService);
  }

  create(product: CreateCorporationStaffServiceDTO): CorporationStaffService {
    return this.ormRepository.create(product)
  }

  async save(product: CorporationStaffService): Promise<void> {
    await this.ormRepository.save(product);
  }


  async findById(id: string, relations: string[]): Promise<CorporationStaffService | null> {
    return this.ormRepository.findOne({
      where: {
        id
      },
      relations
    })
  }
}

export default CorporationStaffServicesRepository;
