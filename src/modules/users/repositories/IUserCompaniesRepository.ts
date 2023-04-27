import User from '../infra/typeorm/entities/User';
import ICreateUserCompanyDTO from '../dtos/ICreateUserCompanyDTO';

export default interface IUserCompaniesRepository {
  create(data: ICreateUserCompanyDTO): User;
  save(data: User): Promise<User>;
  delete(id: string): Promise<void>;
}
