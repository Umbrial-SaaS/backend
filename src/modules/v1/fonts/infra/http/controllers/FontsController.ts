import { FastifyRequest, FastifyReply } from 'fastify';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import ListFontsService from '@modules/v1/fonts/services/ListFontsService';

export default class FontsController {
  public async list(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const listFontsService = container.resolve(ListFontsService);

    const fonts = await listFontsService.execute();

    return res.send({ fonts: classToClass(fonts) });
  }
}
