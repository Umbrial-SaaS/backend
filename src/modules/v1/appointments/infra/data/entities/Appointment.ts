import CorporationService from '@modules/v1/corporations/infra/data/entities/CorporationService';
import 'reflect-metadata'
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import AppointmentService from './AppoitmentService';

@Entity('appointments')
export default class Appointment {
  @PrimaryColumn("uuid")
  id: string;

  @Column("boolean", { default: false })
  canceled: boolean;

  @Column("varchar", { name: 'corporation_id' })
  corporationId: string;

  @Column("varchar", { name: 'corporation_staff_id' })
  corporationStaffId: string;

  @Column("integer")
  price: number;

  @Column("timestamp")
  timestamp: Date;

  // services

  // products

  // ? Relations  
  @OneToMany(() => AppointmentService, (appointmentService) => appointmentService.appointment, { onDelete: 'CASCADE' })
  appointmentServices: AppointmentService[];
}
