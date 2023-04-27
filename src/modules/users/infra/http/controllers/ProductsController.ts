import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IndexProductsService from '../../../services/IndexProductsService';
import CreateProductService from '../../../services/CreateUserService';
import UpdateProductService from '../../../services/UpdateProductService';

export default class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createProductService = container.resolve(CreateProductService);
    console.log('asidjasiodjasoijdass');
    const user = await createProductService.execute(req.body);

    return res.status(201).json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name } = req.body;

    const updateProductService = container.resolve(UpdateProductService);

    const product = await updateProductService.execute({
      id: Number(id),
      name,
    });

    return res.json(classToClass(product));
  }

  public async index(req: Request, res: Response): Promise<void> {
    const indexProductsService = container.resolve(IndexProductsService);

    const products = await indexProductsService.execute();

    res.json(products);
  }
}
