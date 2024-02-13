import { CreateAppointmentDTO } from "../dtos/CreateAppointmentDTO";
import { FilterAppointmentsDTO } from "../dtos/FilterAppointmentsDTO";
import Appointment from "../infra/data/entities/Appointment";

export default interface IAppointmentsRepository {
  filterBy(data: FilterAppointmentsDTO): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment | null>;
  findByCorporationStaffDay(corporationStaffId: string, timestamp: Date): Promise<Appointment[]>;
  create(data: CreateAppointmentDTO): Appointment;
  index(): Promise<Appointment[]>;
  save(data: Appointment): Promise<void>;
}
