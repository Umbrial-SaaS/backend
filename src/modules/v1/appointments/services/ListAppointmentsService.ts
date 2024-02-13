
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/data/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

export interface IListAppointmentsServiceReq {
  filters: {
    corporationId?: string
  }
}

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    filters
  }: IListAppointmentsServiceReq): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.filterBy({
      corporationId: filters.corporationId
    })
    return appointments
  }
}

export default ListAppointmentsService;
