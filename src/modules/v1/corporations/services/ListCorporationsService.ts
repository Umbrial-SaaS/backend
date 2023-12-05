/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';
import Corporation from '../infra/data/entities/Corporation';
import ICorporationsRepository from '../repositories/ICorporationsRepository';

@injectable()
class ListCorporationsService {
  constructor(
    @inject('CorporationsRepository')
    private corporationsRepository: ICorporationsRepository,
  ) { }

  public async execute(): Promise<Corporation[]> {
    const corporations = await this.corporationsRepository.index();

    return corporations;
  }
}

export default ListCorporationsService;
