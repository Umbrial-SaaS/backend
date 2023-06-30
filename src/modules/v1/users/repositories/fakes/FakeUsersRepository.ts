import IFindUserDTO from '@modules/v1/users/dtos/IFindUserDTO';
import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';
import { fakeUser } from './seeds';

class FakeUsersRepository implements IUsersRepository {
  private products: User[] = [fakeUser];

  insert(data: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findBy({ email, phone }: IFindUserDTO): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = this.products.find(item => item.phone === phone);

    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.products.find(item => item.email === email);

    return user || null;
  }

  public async index(): Promise<User[]> {
    return this.products;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = this.products.find(item => item.name === name);

    return user || null;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.products.find(item => item.id === id);

    return user || null;
  }

  public create(data: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, data);

    this.products.push(user);

    return user || null;
  }

  public async save(user: User): Promise<User> {
    this.products.push(user);
    return user || null;
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.products.findIndex(item => item.id === id);

    this.products.splice(userIndex, 1);
  }
}

export default FakeUsersRepository;
