import { Font } from '@prisma/client';

export default interface IFontsRepository {
  findById(id: string): Promise<Font | null>;
  index(): Promise<Font[]>;
}
