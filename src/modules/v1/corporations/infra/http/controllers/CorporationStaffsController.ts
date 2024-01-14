import { FastifyRequest, FastifyReply } from 'fastify';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateCorporationStaffService from '@modules/v1/corporations/services/CreateCorporationStaffService';

export default class CorporationStaffsController {
  public async create(req: FastifyRequest<{
    Body: {
      roleId: number
      personData: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        instagram?: string;
        avatar?: string;
      };
      userData: {
        email: string
        password: string
      }
    },
    Params: {
      corporationId: string
    }
  }>, res: FastifyReply): Promise<void> {
    const createCorporationStaffService = container.resolve(CreateCorporationStaffService);
    const staff = await createCorporationStaffService.execute({
      userId: req.user.sub,
      corporationId: req.params.corporationId,
      ...req.body
    });
    return res.send({ staff: classToClass(staff) });
  }
}
