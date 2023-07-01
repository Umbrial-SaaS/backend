import User from '../infra/data/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindUserDTO from '../dtos/IFindUserDTO';

export default interface IUsersRepository {
  findByPhone(phone: string, relations?: string[]): Promise<User | null>;
  findByEmail(email: string, relations?: string[]): Promise<User | null>;
  findById(id: string, relations?: string[]): Promise<User | null>;
  create(data: ICreateUserDTO): User;
  save(data: User): Promise<void>;
  delete(id: string): Promise<void>;
  findBy({ email, phone }: IFindUserDTO): Promise<User | null>;
}
