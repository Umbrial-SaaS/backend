/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FastifyRequest, FastifyReply } from 'fastify';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import ShowProductsService from '@modules/v1/products/services/ShowProductService';
import CreateProductsService, { ICreateProductsServiceReq } from '@modules/v1/products/services/CreateProductsService';
import util from 'util';
import { pipeline } from 'stream';
import UpdateProductFilesService from '@modules/v1/products/services/UpdateProductFilesService';
import { createSchema } from '../routes/validations/products.validation';
import fs from 'fs'
import console from 'console';
import { IFile } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
const pump = util.promisify(pipeline);

import ListServicesService from '@modules/v1/services/services/ListProductsService';
export default class ProductsController {
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
    const listServicesService = container.resolve(ListServicesService);

    const services = await listServicesService.execute();

    return res.send({ services: classToClass(services) });
  }
}
