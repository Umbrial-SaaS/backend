import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Corporation from '../infra/data/entities/Corporation';
import ICorporationsRepository from '../repositories/ICorporationsRepository';

interface IShowCorporationServiceReq {
  corporationId: string;
}

@injectable()
class ShowCorporationService {
  constructor(
    @inject('CorporationsRepository')
    private corporationsRepository: ICorporationsRepository,
  ) { }

  public async execute({
    corporationId,
  }: IShowCorporationServiceReq): Promise<Corporation> {
    const corporation = await this.corporationsRepository.showById(corporationId);
    if (!corporation) {
      throw new AppError('corporation_not_found', 404);
    }
    return corporation;
  }
}

export default ShowCorporationService;
