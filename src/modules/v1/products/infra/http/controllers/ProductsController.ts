import { FastifyRequest, FastifyReply } from 'fastify';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import ListFontsService from '@modules/v1/fonts/services/ListFontsService';
import ShowProductsService from '@modules/v1/products/services/ShowProductService';
import CreateProductsService from '@modules/v1/products/services/CreateProductsService';
import { createSchema } from '../routes/validations/products.validation';

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

  public async create(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const createProductsService = container.resolve(CreateProductsService);

    const productParams = createSchema.parse(req.body);

    const product = await createProductsService.execute({
      product: productParams,
      userId: req.user.id,
    });

    return res.send({ product: classToClass(product) });
  }
}
