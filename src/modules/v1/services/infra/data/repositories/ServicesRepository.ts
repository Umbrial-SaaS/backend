import IServicesRepository from "@modules/v1/services/repositories/IServicesRepository";
import AppDataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import Service from "../entities/Service";

class ServicesRepository implements IServicesRepository {
  private ormRepository: Repository<Service>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Service);
  }


  async save(product: Service): Promise<void> {
    await this.ormRepository.save(product);
  }

  async index(): Promise<Service[]> {
    return this.ormRepository.find();
  }

  async findById(id: string): Promise<Service | null> {
    return this.ormRepository.findOne({
      where: {
        id
      }
    })
  }
}

export default ServicesRepository;
