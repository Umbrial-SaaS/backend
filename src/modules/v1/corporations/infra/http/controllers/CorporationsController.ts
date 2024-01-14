/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FastifyRequest, FastifyReply } from 'fastify';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateCorporationService from '@modules/v1/corporations/services/CreateCorporationService';
import util from 'util';
import { pipeline } from 'stream';
import UpdateProductFilesService from '@modules/v1/products/services/UpdateProductFilesService';
import ListProductsService from '@modules/v1/products/services/ListProductsService';
import { createSchema } from '../routes/validations/products.validation';
import fs from 'fs'
import console from 'console';
import { IFile } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
const pump = util.promisify(pipeline);

import ShowCorporationService from '@modules/v1/corporations/services/ShowCorporationService';
export default class CorporationsController {
  public async show(
    req: FastifyRequest<{
      Params: {
        corporationId: string;
      };
    }>,
    res: FastifyReply,
  ): Promise<void> {
    const showCorporationService = container.resolve(ShowCorporationService);

    const corporation = await showCorporationService.execute({
      corporationId: req.params.corporationId,
    });

    return res.send({ corporation: classToClass(corporation) });
  }

  public async list(
    req: FastifyRequest<{
      Querystring: {
        page: number;
        sellerId: string;
        pageSize: number;
      };
    }>,
    res: FastifyReply,
  ): Promise<void> {
    const listProductsService = container.resolve(ListProductsService);

    const product = await listProductsService.execute({
      sellerId: req.query.sellerId,
      page: req.query.page || 1,
      pageSize: req.query.pageSize || 10,
    });

    return res.send({ products: classToClass(product) });
  }

  public async updateFiles(
    req: FastifyRequest<{
      Params: {
        productId: string;
      };
    }>,
    res: FastifyReply,
  ): Promise<void> {
    const updateProductFilesService = container.resolve(
      UpdateProductFilesService,
    );

    const parts: IFile[] = (req as any).parts()
    const files: any = {}
    for await (const part of parts) {
      if (part.file) {
        files[`${part.fieldname}`] = {
          filename: part.filename,
          fieldname: part.fieldname,
          mimetype: part.mimetype,
        }
        // upload and save the file
        await pump(part.file, fs.createWriteStream(`./tmp/${part.filename}`))


      } else {
        console.log('else')
      }

    }

    const { productId } = req.params;


    // const productParams = createSchema.parse(req.body);
    const product = await updateProductFilesService.execute({
      id: productId,
      userId: req.user.data.id,
      cover: files.cover,
      thumbnail: files.thumbnail
    });
    return res.send({ product: classToClass(product) });
  }

  public async create(req: FastifyRequest<{
    Body: {
      active: boolean;
      name: string;
      description: string;
      instagram: string;
    }
  }>, res: FastifyReply): Promise<void> {
    const createCorporationService = container.resolve(CreateCorporationService);

    createSchema.parse(req.body);
    const corporation = await createCorporationService.execute({
      corporationData: req.body,
      userId: req.user.sub
    });
    return res.send({ corporation: classToClass(corporation) });
  }
}
