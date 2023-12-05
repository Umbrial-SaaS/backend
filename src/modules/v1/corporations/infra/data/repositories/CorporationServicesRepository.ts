import ICorporationServicesRepository from '@modules/v1/corporations/repositories/ICorporationServicesRepository';
import { CreateCorporationDTO } from '@modules/v1/corporations/dtos/CreateCorporationDTO';
import Corporation from '../entities/Corporation';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import CorporationService from '../entities/CorporationService';
import { CreateCorporationServiceDTO } from '@modules/v1/corporations/dtos/CreateCorporationServiceDTO';

class CorporationServicesRepository implements ICorporationServicesRepository {
  private ormRepository: Repository<CorporationService>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(CorporationService);
  }

  create(product: CreateCorporationServiceDTO): CorporationService {
    return this.ormRepository.create(product)
  }

  async save(product: CorporationService): Promise<void> {
    await this.ormRepository.save(product);
  }


  async findById(id: string, relations: string[]): Promise<CorporationService | null> {
    return this.ormRepository.findOne({
      where: {
        id
      },
      relations
    })
  }
}

export default CorporationServicesRepository;
