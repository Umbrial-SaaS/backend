import IFindUserDTO from '@modules/v1/users/dtos/IFindUserDTO';
import clearJson from '@shared/functions/clearJson';
import prisma from '@shared/infra/prisma';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateProductDTO from '../../../dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  async findByPhone(phone: string, relations?: string[]): Promise<User | null> {
    return Object.assign(
      new User(),
      await prisma.user.findUnique({
        where: { phone },
      }),
    );
  }

  async findByEmail(email: string, relations?: string[]): Promise<User | null> {
    return Object.assign(
      new User(),
      await prisma.user.findUnique({
        where: { email },
      }),
    );
  }

  public async findById(id: string, sasdas?: string[]): Promise<User | null> {
    return Object.assign(
      new User(),
      await prisma.user.findUnique({
        where: { id },
      }),
    );
  }

  public async findBy({ email, phone }: IFindUserDTO): Promise<User | null> {
    return Object.assign(
      new User(),
      await prisma.user.findUnique({
        where: clearJson({ email, phone }),
      }),
    );
  }

  public create(user: ICreateProductDTO): User {
    return Object.assign(new User(), user);
  }

  public async save(data: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
        phone: data.phone,
        bio: data.bio,
        email: data.email,
        googleId: data.googleId,
        facebookId: data.facebookId,
        avatar: data.avatar,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}

export default UsersRepository;
