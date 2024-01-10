/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';
import Service from '../infra/data/entities/Service';
import IServicesRepository from '../repositories/IServicesRepository';

@injectable()
class ListServicesService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
  ) { }

  public async execute(): Promise<Service[]> {
    const services = await this.servicesRepository.index();

    return services;
  }
}

export default ListServicesService;
