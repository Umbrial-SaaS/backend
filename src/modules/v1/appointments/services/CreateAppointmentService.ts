
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/data/entities/Appointment';
import ICorporationsRepository from '@modules/v1/corporations/repositories/ICorporationsRepository';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';

export interface ICreateAppointmentServiceReq {
  userId: string;
  corporationId: string;

  corporationStaffId: string
  timestamp: Date

  services: {
    serviceId: string
    price?: number
    quantity: number
  }[]
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

    @inject('CorporationsRepository')
    private corporationsRepository: ICorporationsRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    corporationStaffId,
    corporationId,
    timestamp,
    userId,
    services
  }: ICreateAppointmentServiceReq): Promise<Appointment> {
    console.log({
      corporationStaffId,
      corporationId,
      timestamp,
      userId,
      services
    })
    const corporation = await this.corporationsRepository.showById(corporationId)
    if (!corporation) {
      throw new AppError('corporation_not_found', 404)
    }
    const isTheUserAStaffMember = corporation.corporationStaff.find(corporationStaff => corporationStaff.userId === userId)
    if (!isTheUserAStaffMember) {
      throw new AppError('the_user_is_not_a_staff_member', 403)
    }

    const corporationStaffMember = corporation.corporationStaff.find(corporationStaff => corporationStaff.id === corporationStaffId)
    if (!corporationStaffMember) {
      throw new AppError('corporation_staff_member_does_not_exists', 404)
    }
    let price = 0
    for await (const service of services) {
      const thisStaffMemberProvidesThisService = corporationStaffMember.services.find(staffService => staffService.id === service.serviceId)
      if (!thisStaffMemberProvidesThisService) {
        throw new AppError('this_staff_member_doenst_provides_this_service')
      }
      if (thisStaffMemberProvidesThisService.active === false) {
        throw new AppError('this_staff_member_doenst_provides_this_service_now')
      }
      service.price ?? (price = +service.price)

      // const appointmentsByThisDay = await this.appointmentsRepository.findByCorporationStaffDay(
      //   corporationStaffId,
      //   timestamp
      // )
      // TODO: Quanto tempo antes eu preciso ter reservado?
      // TODO: Não pode ter agendamento duplicado para:

      //  TODO: mesmo cliente
      //  TODO: mesmo barbeiro


      // TODO: Tem que somar a duracao de todos os serviços agendados
      // * OK: Não pode agendar serviços que estão desativados; 
      // TODO: Não pode agendar serviços em datas fora do horario da barbearia;
      // TODO: Verificar sobre feriados;

      // * OK: Não agendar serviços que o prestador nao faça;


      const appointment = this.appointmentsRepository.create({
        id: this.idGeneratorProvider.generate(),
        canceled: false,
        corporationId,
        corporationStaffId,
        price,
        timestamp,
      })

      return appointment
    }
  }
}
export default CreateAppointmentService;
