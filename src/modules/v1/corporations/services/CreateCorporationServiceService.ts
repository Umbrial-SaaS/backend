/* eslint-disable prettier/prettier */
import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICorporationServicesRepository from '../repositories/ICorporationServicesRepository';
import CorporationService from '../infra/data/entities/CorporationService';
import IServicesRepository from '@modules/v1/services/repositories/IServicesRepository';
import ICorporationStaffRepository from '../repositories/ICorporationStaffRepository';

interface ICreateCorporationServiceReq {
  userId: string;
  corporationId: string
  service: {
    id: string
    active: boolean;
    price: string;
    duration: string;
  }
}

@injectable()
class CreateCorporationServiceService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

    @inject('CorporationStaffRepository')
    private corporationStaffRepository: ICorporationStaffRepository,

    @inject('CorporationServicesRepository')
    private corporationServicesRepository: ICorporationServicesRepository,

    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
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

    const corporationStaff = await this.corporationStaffRepository.findByUserAndCorporation(userId, corporationId)
    if (!corporationStaff) {
      throw new AppError('is_not_a_corporation_staff', 401)
    }
    const serviceExists = await this.servicesRepository.findById(service.id)
    if (!serviceExists) {
      throw new AppError('service_not_found', 404)
    }

    const corporationService = this.corporationServicesRepository.create({
      id: this.idGeneratorProvider.generate(),
      active: service.active,
      duration: service.duration,
      price: service.price,
      name: serviceExists.name,
      corporationId,
      serviceId: service.id
    })

    await this.corporationServicesRepository.save(corporationService);

    return corporationService;
  }
}

export default CreateCorporationServiceService;
