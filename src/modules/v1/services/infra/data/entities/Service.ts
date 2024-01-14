import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import CorporationService from "@modules/v1/corporations/infra/data/entities/CorporationService";
import AppointmentService from "@modules/v1/appointments/infra/data/entities/AppoitmentService";

@Entity('services')
export default class Service {
  @PrimaryColumn()
  id: number;

  @Column({ default: false })
  active: boolean;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(() => CorporationService, (service) => service.corporation)
  corporationServices: CorporationService[];

  @OneToMany(() => AppointmentService, (appointmentService) => appointmentService.appointment, { onDelete: 'CASCADE' })
  appointmentServices: AppointmentService[];
}
