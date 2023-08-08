import IFindUserDTO from '@modules/v1/users/dtos/IFindUserDTO';
import clearJson from '@shared/functions/clearJson';
import prisma from '@shared/infra/prisma';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateProductDTO from '../../../dtos/ICreateUserDTO';

import User from '../entities/User';
import { AppDataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  async findByPhone(phone: string, relations?: string[]): Promise<User | null> {
    return this.ormRepository.findOne({
      where: {
        phone
      }
    })
  }

  async findByEmail(email: string, relations?: string[]): Promise<User | null> {
    return this.ormRepository.findOne({
      where: {
        email
      }
    })
  }

  public async findById(id: string, relations?: string[]): Promise<User | null> {
    return this.ormRepository.findOne({
      where: {
        id,
      },
      relations
    })
  }

  public async findBy({ email, phone }: IFindUserDTO): Promise<User | null> {
    return this.ormRepository.findOne({
      where: clearJson({ email, phone }),
    })
  }

  public create(user: ICreateProductDTO): User {
    return this.ormRepository.create(user)
  }

  public async save(data: User): Promise<void> {
    console.log(data)
    await this.ormRepository.save(data)
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  public async update(user: User): Promise<void> {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        phone: user.phone,
        bio: user.bio,
        email: user.email,
        googleId: user.googleId,
        facebookId: user.facebookId,
        avatar: user.avatar,
        password: user.password,
      },
    });
  }
}

export default UsersRepository;
