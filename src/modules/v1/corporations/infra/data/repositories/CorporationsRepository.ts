import ICorporationsRepository from '@modules/v1/corporations/repositories/ICorporationsRepository';
import { CreateCorporationDTO } from '@modules/v1/corporations/dtos/CreateCorporationDTO';
import Corporation from '../entities/Corporation';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

class CorporationsRepository implements ICorporationsRepository {
  private ormRepository: Repository<Corporation>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Corporation);
  }

  create(product: CreateCorporationDTO): Corporation {
    return this.ormRepository.create(product)
  }

  async save(product: Corporation): Promise<void> {
    await this.ormRepository.save(product);
  }

  async index(): Promise<Corporation[]> {
    return this.ormRepository.find();
  }

  async findById(id: string, relations: string[]): Promise<Corporation | null> {
    return this.ormRepository.findOne({
      where: {
        id
      },
      relations: {

      }
    })
  }
  async showById(id: string): Promise<Corporation | null> {
    return this.ormRepository.findOne({
      where: {
        id
      },
      relations: {
        corporationStaff: {
          user: {
            person: true
          }
        },
        products: true
      }
    })
  }
}

export default CorporationsRepository;
