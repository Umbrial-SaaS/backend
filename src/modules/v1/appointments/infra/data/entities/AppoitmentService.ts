import 'reflect-metadata'
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import Appointment from "./Appointment";
import Service from '@modules/v1/services/infra/data/entities/Service';

@Entity('appoitment_services')
export default class AppointmentService {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { name: 'service_id' })
  serviceId: string;

  @Column("varchar", { name: 'appointment_id' })
  appointmentId: string;

  @Column("integer")
  price: string;

  @Column("boolean")
  byPlan: boolean;

  // Relations
  @OneToMany(() => Appointment, (appointment) => appointment.appointmentServices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "appointment_id" })
  appointment: Appointment[];

  @OneToMany(() => Service, (service) => service.appointmentServices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "service_id" })
  services: Service[];
}
