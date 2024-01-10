/* eslint-disable prettier/prettier */
import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Corporation from '../infra/data/entities/Corporation';
import ICorporationStaffStaffRepository from '../repositories/ICorporationStaffRepository';
import ICorporationServicesRepository from '../repositories/ICorporationServicesRepository';
import CorporationService from '../infra/data/entities/CorporationService';

interface ICreateCorporationServiceReq {
  userId: string;
  corporationId: string
  service: {
    active: boolean;
    name: string;
    price: string;
    duration: string;
    description: string;
    instagram: string;
  }
}

@injectable()
class CreateCorporationServiceService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

    @inject('CorporationStaffStaffRepository')
    private corporationStaffStaffRepository: ICorporationStaffStaffRepository,

    @inject('CorporationServicesRepository')
    private corporationServicesRepository: ICorporationServicesRepository,
  ) { }

  public async execute({
    userId,
    corporationId,
    service
  }: ICreateCorporationServiceReq): Promise<CorporationService> {
    const user = await this.usersRepository.findById(userId);
    if (user === null) {
      throw new AppError('user_not_found', 404);
    }

    const corporationStaff = await this.corporationStaffStaffRepository.findByUserAndCorporation(userId, corporationId)
    if (!corporationStaff) {
      throw new AppError('is_not_a_corporation_staff', 401)
    }

    const corporationService = this.corporationServicesRepository.create({
      id: this.idGeneratorProvider.generate(),
      ...service,
    })

    await this.corporationServicesRepository.save(corporationService);

    return corporationService;
  }
}

export default CreateCorporationServiceService;
