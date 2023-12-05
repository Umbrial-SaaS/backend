
import Font from '@modules/v1/fonts/infra/data/entities/Font';
import { fakeFonts } from './seeds';
import IFontsRepository from '@modules/v1/fonts/repositories/IFontsRepository';

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
