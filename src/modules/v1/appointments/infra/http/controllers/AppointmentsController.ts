import { FastifyRequest, FastifyReply } from 'fastify';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/v1/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(req: FastifyRequest<{
    Body: {
      timestamp: Date,
      services: {
        serviceId: number,
        quantity: number
      }[],
    },
    Params: {
      corporationId: string,
      corporationStaffId: string,
    }
  }>, res: FastifyReply): Promise<void> {
    const createAppointmentService = container.resolve(CreateAppointmentService);

    const appointment = await createAppointmentService.execute({
      userId: req.user.data.id,
      corporationId: req.params.corporationId,
      corporationStaffId: req.params.corporationStaffId,
      services: req.body.services,
      timestamp: req.body.timestamp
    });

    return res.send({ appointment: classToClass(appointment) });
  }
}
