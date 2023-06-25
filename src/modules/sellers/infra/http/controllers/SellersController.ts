import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CreateSellerReqDTO } from '@modules/sellers/dtos/CreateSellerDTO';
import CreateSellerService from '@modules/sellers/services/CreateSellerService';
import UpdateSellerService, {
  UpdateSellerServiceReq,
} from '@modules/sellers/services/UpdateSellerService';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UpdateSellerReqDTO } from '@modules/sellers/dtos/UpdateSellerDTO';

export default class SellersController {
  public async create(
    req: FastifyRequest<{ Body: CreateSellerReqDTO }>,
    res: FastifyReply,
  ): Promise<FastifyReply> {
    const createSellerService = container.resolve(CreateSellerService);
    const user = await createSellerService.execute(req.body);

    return res.send(classToClass(user));
  }

  public async update(
    req: FastifyRequest<{ Body: UpdateSellerReqDTO }>,
    res: FastifyReply,
  ): Promise<void> {
    const updateSellerService = container.resolve(UpdateSellerService);

    const user = await updateSellerService.execute(req.body);

    return res.send(classToClass(user));
  }
}
