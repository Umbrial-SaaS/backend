import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindUserDTO from '../dtos/IFindUserDTO';

export default interface IUsersRepository {
  index(): Promise<User[]>;
  findByName(name: string): Promise<User | null>;
  findByPhone(phone: string, relations?: string[]): Promise<User | null>;
  findByEmail(email: string, relations?: string[]): Promise<User | null>;
  findById(id: string, relations?: string[]): Promise<User | null>;
  create(data: ICreateUserDTO): User;
  save(data: User): Promise<User>;
  delete(id: string): Promise<void>;
  insert(data: User): Promise<void>;
  findBy({ email, phone }: IFindUserDTO): Promise<User | null>;
}
