/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FastifyRequest, FastifyReply } from 'fastify';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { createSchema } from '../routes/validations/products.validation';

import CreateCorporationServiceService from '@modules/v1/corporations/services/CreateCorporationServiceService';

export default class CorporationServicesController {
  public async create(req: FastifyRequest<{
    Body: {
      id: string
      active: boolean;
      price: string;
      duration: string;
    },
    Params: {
      corporationId: string
    }
  }>, res: FastifyReply): Promise<void> {
    const createCorporationServiceService = container.resolve(CreateCorporationServiceService); 
    const service = await createCorporationServiceService.execute({
      service: req.body,
      userId: req.user.sub,
      corporationId: req.params.corporationId
    });
    return res.send({ service: classToClass(service) });
  }
}
