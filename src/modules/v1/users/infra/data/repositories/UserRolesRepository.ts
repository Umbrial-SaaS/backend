import ICreateUserRoleDTO from '@modules/v1/users/dtos/ICreateUserRoleDTO';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime';
import prisma from '@shared/infra/prisma';
import IUserRolesRepository from '../../../repositories/IUserRolesRepository';

import UserRole from '../entities/UserRole';

class UserRolesRepository implements IUserRolesRepository {
  private ormRepository: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
    DefaultArgs
  >;

  constructor() {
    this.ormRepository = prisma;
  }

  public create(user: ICreateUserRoleDTO): UserRole {
    return Object.assign(new UserRole(), user);
  }

  public async save(data: UserRole): Promise<void> {
    await this.ormRepository.userRole.create({
      data: {
        id: data.id,
        roleId: data.roleId,
        userId: data.userId,
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.userRole.delete({ where: { id } });
  }
}

export default UserRolesRepository;
