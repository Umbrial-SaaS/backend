import ICorporationStaffRepository from '@modules/v1/corporations/repositories/ICorporationStaffRepository';
import { CreateCorporationDTO } from '@modules/v1/corporations/dtos/CreateCorporationDTO';
import Corporation from '../entities/Corporation';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import CorporationStaff from '../entities/CorporationStaff';
import { CreateCorporationStaffDTO } from '@modules/v1/corporations/dtos/CreateCorporationStaffDTO';

class CorporationStaffRepository implements ICorporationStaffRepository {
  private ormRepository: Repository<CorporationStaff>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(CorporationStaff);
  }
  async findByUserAndCorporation(userId: string, corporationId: string): Promise<CorporationStaff | undefined> {
    const staff = await this.ormRepository.findOne(
      {
        where: {
          userId,
          corporationId
        }
      }
    )
    return staff || undefined
  }

  create(product: CreateCorporationStaffDTO): CorporationStaff {
    return this.ormRepository.create(product)
  }

  async save(product: CorporationStaff): Promise<void> {
    await this.ormRepository.save(product);
  }

  async findById(id: string, relations: string[]): Promise<CorporationStaff | null> {
    return this.ormRepository.findOne({
      where: {
        id
      },
      relations
    })
  }
}

export default CorporationStaffRepository;
