export type CreateAppointmentDTO = {
  id: string;

  canceled: boolean;
  corporationId: string;
  corporationStaffId: string;
  price: number;
  timestamp: Date;
};
