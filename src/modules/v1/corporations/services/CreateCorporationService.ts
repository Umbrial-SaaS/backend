/* eslint-disable prettier/prettier */
import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Corporation from '../infra/data/entities/Corporation';
import ICorporationsRepository from '../repositories/ICorporationsRepository';
import ICorporationStaffStaffRepository from '../repositories/ICorporationStaffRepository';

interface ICreateCorporationServiceReq {
  userId: string;
  corporationData: {
    active: boolean;
    name: string;
    description: string;
    instagram: string;
  };
}

@injectable()
class CreateCorporationService {
  constructor(
    @inject('CorporationsRepository')
    private corporationsRepository: ICorporationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

    @inject('CorporationStaffRepository')
    private corporationStaffRepository: ICorporationStaffStaffRepository,
  ) { }

  public async execute({
    userId,
    corporationData
  }: ICreateCorporationServiceReq): Promise<Corporation> {
    const user = await this.usersRepository.findById(userId);
    if (user === null) {
      throw new AppError('user_not_found', 404);
    }

    const corporation = this.corporationsRepository.create({
      id: this.idGeneratorProvider.generate(),
      active: corporationData.active,
      description: corporationData.description,
      name: corporationData.name,
      instagram: corporationData.instagram,
    })

    const corporationStaff = this.corporationStaffRepository.create({
      active: true,
      corporationId: corporation.id,
      id: this.idGeneratorProvider.generate(),
      userId: user.id,
      role: 1,
    })

    await this.corporationsRepository.save(corporation);
    await this.corporationStaffRepository.save(corporationStaff)

    return corporation;
  }
}

export default CreateCorporationService;
