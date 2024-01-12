
import Font from '../../infra/data/entities/Font';
import IFontsRepository from '../IFontsRepository';
import { fakeFonts } from './seeds';

class FakeFakeFontsRepository implements IFontsRepository {
  private data: Font[] = [fakeFonts];

  public async index(): Promise<Font[]> {
    return this.data;
  }

  public async findById(id: string): Promise<Font | null> {
    const user = this.data.find(item => item.id === id);

    return user || null;
  }
}

export default FakeFakeFontsRepository;
