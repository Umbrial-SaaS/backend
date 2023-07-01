import ICreateRefreshTokenDTO from '../dtos/ICreateRefreshTokenDTO';
import RefreshToken from '../infra/data/entities/RefreshToken';

export default interface IRefreshTokensRepository {
  findByUserId(id: string): Promise<RefreshToken | null>;
  findByRefreshToken(token: string): Promise<RefreshToken | null>;
  findByAccessToken(token: string): Promise<RefreshToken | null>;
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
}
