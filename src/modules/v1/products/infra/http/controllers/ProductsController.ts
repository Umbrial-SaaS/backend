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

const pump = util.promisify(pipeline);
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
    const files = await req.file();

    console.log(files);

    const { productId } = req.params;

    // const productParams = createSchema.parse(req.body);
    const product = await updateProductFilesService.execute({
      id: productId,
      userId: req.user.id,
    });
    return res.send({ product: classToClass(product) });
  }

  public async create(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const createProductsService = container.resolve(CreateProductsService);

    const productParams = createSchema.parse(req.body);
    const product = await createProductsService.execute({
      product: productParams,
      userId: req.user.data.id,
    });
    return res.send({ product: classToClass(product) });
  }
}
