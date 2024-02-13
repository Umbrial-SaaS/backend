import { v4 } from 'uuid';
import Appointment from '../../infra/data/entities/Appointment';
import IAppointmentsRepository from '../IAppointmentsRepository';
import { CreateAppointmentDTO } from '../../dtos/CreateAppointmentDTO';
import { FilterAppointmentsDTO } from '../../dtos/FilterAppointmentsDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private data: Appointment[] = [];

  public async filterBy(data: FilterAppointmentsDTO): Promise<Appointment[]> {
    return this.data;
  }

  public async index(): Promise<Appointment[]> {
    return this.data;
  }

  public async findByCorporationStaffDay(corporationStaffId: string, timestamp: Date): Promise<Appointment[]> {
    return this.data;
  }

  public create(data: CreateAppointmentDTO): Appointment {
    const user = new Appointment();

    Object.assign(user, {
      id: v4(),
      ...data,
      created_at: Date.now(),
    });

    return user;
  }

  public async save(data: Appointment): Promise<void> {
    this.data.push(data);
  }

  public async findById(id: string): Promise<Appointment | null> {
    const user = this.data.find(item => item.id === id);

    return user || null;
  }
}

export default FakeAppointmentsRepository;
