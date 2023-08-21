
import { injectable, inject } from 'tsyringe';
import IFontsRepository from '../repositories/IFontsRepository';
import Font from '../infra/data/entities/Font';

@injectable()
class ListFontsService {
  constructor(
    @inject('FontsRepository')
    private fontsRepository: IFontsRepository,
  ) { }

  public async execute(): Promise<Font[]> {
    return this.fontsRepository.index();
  }
}

export default ListFontsService;
