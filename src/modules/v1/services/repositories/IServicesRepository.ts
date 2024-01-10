import Service from '../infra/data/entities/Service';

export default interface IServicesRepository {
  findById(id: string): Promise<Service | null>;
  index(): Promise<Service[]>;
  save(product: Service): Promise<void>;
}
