import Font from "../infra/data/entities/Font";

export default interface IFontsRepository {
  findById(id: string): Promise<Font | null>;
  index(): Promise<Font[]>;
}
