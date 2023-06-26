import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';
import clearJson from '@shared/functions/clearJson';
import appDataSource from '@shared/infra/typeorm';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateProductDTO from '../../../dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  findByPhone(phone: string, relations?: string[]): Promise<User | null> {
    return appDataSource.getRepository(User).findOne({
      where: { phone },
      relations,
    });
  }

  findByEmail(email: string, relations?: string[]): Promise<User | null> {
    return appDataSource.getRepository(User).findOne({
      where: { email },
      relations,
    });
  }

  public async index(): Promise<User[]> {
    const breeds = await appDataSource.getRepository(User).find({
      order: { name: 'ASC' },
    });
    return breeds;
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<User | null> {
    return appDataSource.getRepository(User).findOne({
      where: { id },
      relations,
    });
  }

  public async findBy({ email, phone }: IFindUserDTO): Promise<User | null> {
    return appDataSource.getRepository(User).findOne({
      where: clearJson({ email, phone }),
    });
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await appDataSource.getRepository(User).findOne({
      where: { name },
    });

    return user;
  }

  public create(user: ICreateProductDTO): User {
    return appDataSource.getRepository(User).create(user);
  }

  public async save(data: User): Promise<User> {
    return appDataSource.getRepository(User).save(data);
  }

  public async insert(data: User): Promise<void> {
    await appDataSource.getRepository(User).insert(data);
  }

  public async delete(id: string): Promise<void> {
    await appDataSource.getRepository(User).delete(id);
  }
}

export default UsersRepository;
