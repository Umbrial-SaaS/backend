/* eslint-disable prettier/prettier */
import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICorporationsRepository from '../repositories/ICorporationsRepository';
import ICorporationStaffStaffRepository from '../repositories/ICorporationStaffRepository';
import ICorporationServicesRepository from '../repositories/ICorporationServicesRepository';
import RolesEnum from '@shared/enums/RolesEnum';
import IPersonsRepository from '@modules/v1/users/repositories/IPersonsRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import CorporationStaff from '../infra/data/entities/CorporationStaff';
import ICorporationStaffServicesRepository from '../repositories/ICorporationStaffServicesRepository';

interface ICreateCorporationStaffServiceReq {
  userId: string;
  corporationId: string;
  roleId: number
  personData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    instagram?: string;
    avatar?: string;
  };
  userData: {
    email: string
    password: string
  }
}

@injectable()
class CreateCorporationStaffService {
  constructor(
    @inject('CorporationsRepository')
    private corporationsRepository: ICorporationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

    @inject('CorporationStaffRepository')
    private corporationStaffRepository: ICorporationStaffStaffRepository,

    @inject('CorporationStaffServicesRepository')
    private corporationStaffServicesRepository: ICorporationStaffServicesRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    userId,
    personData,
    corporationId,
    userData,
    roleId
  }: ICreateCorporationStaffServiceReq): Promise<CorporationStaff> {
    const user = await this.usersRepository.findById(userId);
    if (user === null) {
      throw new AppError('user_not_found', 404);
    }

    const corporation = await this.corporationsRepository.showById(corporationId)
    if (corporation === null) {
      throw new AppError('corporation_not_found', 404);
    }

    const thisUserIsAStaffMember = corporation.corporationStaff.find(staffMembers => staffMembers.userId === userId)
    if (!thisUserIsAStaffMember || (thisUserIsAStaffMember.role !== RolesEnum.Admin)) {
      throw new AppError('not_a_corporation_owner', 400)
    }

    const staffPerson = this.personsRepository.create({
      id: this.idGeneratorProvider.generate(),
      firstName: personData.firstName,
      lastName: personData.lastName,
      phoneNumber: personData.phoneNumber
    })

    const staffUser = this.usersRepository.create({
      id: this.idGeneratorProvider.generate(),
      personId: staffPerson.id,
      email: userData.email,
      password: await this.hashProvider.generateHash(userData.password)
    })

    const corporationStaff = this.corporationStaffRepository.create({
      active: true,
      corporationId: corporation.id,
      id: this.idGeneratorProvider.generate(),
      userId: staffUser.id,
      role: roleId,
    })


    await this.personsRepository.save(staffPerson)
    await this.usersRepository.save(staffUser)
    await this.corporationStaffRepository.save(corporationStaff)

    corporationStaff.services = []
    const corporationStaffServices = corporation.services.map(async corporationService => {
      const corporationStaffService = this.corporationStaffServicesRepository.create({
        active: corporationService.active,
        corporationStaffId: corporationStaff.id,
        duration: corporationService.duration,
        price: corporationService.price,
        serviceId: corporationService.serviceId,
        id: this.idGeneratorProvider.generate(),
      })
      await this.corporationStaffServicesRepository.save(corporationStaffService)
      corporationStaff.services.push(corporationStaffService)
    })

    await Promise.all(corporationStaffServices)

    return corporationStaff;
  }
}

export default CreateCorporationStaffService;
