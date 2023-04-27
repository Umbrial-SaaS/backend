import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyService from '../../../services/CreateCompanyService';

export default class CompaniesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createCompanyService = container.resolve(CreateCompanyService);
    const user = await createCompanyService.execute(req.body);

    return res.status(201).json(classToClass(user));
  }
}
