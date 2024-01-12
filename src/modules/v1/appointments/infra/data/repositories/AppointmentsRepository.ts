import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '@modules/v1/appointments/repositories/IAppointmentsRepository';
import { CreateAppointmentDTO } from '@modules/v1/appointments/dtos/CreateAppointmentDTO';


class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Appointment);
  }
  findByCorporationStaffDay(corporationStaffId: string, timestamp: Date): Promise<Appointment[]> {
    throw new Error('Method not implemented.');
  }

  create(data: CreateAppointmentDTO): Appointment {
    return this.ormRepository.create(data)
  }

  async index(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }

  async save(data: Appointment): Promise<void> {
    await this.ormRepository.save(data);
  }

  async findById(id: string): Promise<Appointment> {
    return Object.assign(
      new Appointment(),
      await this.ormRepository.findOne({
        where: { id },
      }),
    );
  }
}

export default AppointmentsRepository;
