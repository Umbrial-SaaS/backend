/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FastifyRequest, FastifyReply } from 'fastify';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import ShowProductsService from '@modules/v1/products/services/ShowProductService';
import CreateProductsService from '@modules/v1/products/services/CreateProductsService';
import util from 'util';
import { pipeline } from 'stream';
import UpdateProductFilesService from '@modules/v1/products/services/UpdateProductFilesService';
import ListProductsService from '@modules/v1/products/services/ListProductsService';
import { createSchema } from '../routes/validations/products.validation';
import fs from 'fs'
import console from 'console';
import { IFile } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
const pump = util.promisify(pipeline);

import axios from 'axios'
export default class ProductsController {
  public async show(
    req: FastifyRequest<{
      Params: {
        productId: string;
      };
    }>,
    res: FastifyReply,
  ): Promise<void> {
    const showProductsService = container.resolve(ShowProductsService);

    const product = await showProductsService.execute({
      productId: req.params.productId,
    });

    return res.send({ product: classToClass(product) });
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

  public async create(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const createProductsService = container.resolve(CreateProductsService);

    console.log({ body: req.body })

    console.log({ user: req.user })

    const productParams = createSchema.parse(req.body);
    const product = await createProductsService.execute({
      product: productParams,
      userId: req.user.sub
    });
    console.table({ product })
    return res.send({ product: classToClass(product) });
  }
}
