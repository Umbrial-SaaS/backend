import IFontsRepository from '@modules/v1/fonts/repositories/IFontsRepository';
import { AppDataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Font from '../entities/Font';


class FontsRepository implements IFontsRepository {
  private ormRepository: Repository<Font>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Font);
  }

  async index(): Promise<Font[]> {
    return this.ormRepository.find();
  }

  async findById(id: string): Promise<Font> {
    return Object.assign(
      new Font(),
      await this.ormRepository.findOne({
        where: { id },
      }),
    );
  }
}

export default FontsRepository;
