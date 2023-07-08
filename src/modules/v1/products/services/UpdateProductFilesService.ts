/* eslint-disable no-console */
import IUsersRepository from '@modules/v1/users/repositories/IUsersRepository';
import IStorageProvider, {
  IFile,
} from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Product from '../infra/data/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IUpdateProductFilesServiceReq {
  userId: string;

  id: string;
  thumbnail?: IFile;
  cover?: IFile;
  files?: IFile[];
}

@injectable()
class UpdateProductFilesService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    userId,
    thumbnail,
    cover,
    files,
  }: IUpdateProductFilesServiceReq): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('product_not_found', 404);
    }

    if (cover) {
      product.coverUrl = await this.storageProvider.saveFile(cover, 'products');
      console.log('product.coverUrl');
      console.table({ coverUrl: product.coverUrl });
    }

    if (thumbnail) {
      product.thumbnailUrl = await this.storageProvider.saveFile(
        thumbnail,
        'products',
      );
      console.log('product.thumbnailUrl');
      console.table({ thumbnailUrl: product.thumbnailUrl });
    }

    return product;
  }
}

export default UpdateProductFilesService;
