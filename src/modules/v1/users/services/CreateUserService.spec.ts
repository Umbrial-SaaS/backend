import FakeSellersRepository from '@modules/v1/sellers/repositories/fakes/FakeSellersRepository';
import ISellersRepository from '@modules/v1/sellers/repositories/ISellersRepository';
import FakeIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/fakes/FakeIdGeneratorProvider';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUserRolesRepository from '../repositories/IUserRolesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;

let createUserService: CreateUserService;
let fakeUserRolesRepository: IUserRolesRepository;
let fakeSellersRepository: ISellersRepository;
let fakeIdGeneratorProvider: IIdGeneratorProvider;
describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserRolesRepository = new FakeUserRolesRepository();
    fakeSellersRepository = new FakeSellersRepository();
    fakeIdGeneratorProvider = new FakeIdGeneratorProvider();

    createUserService = new CreateUserService(fakeUsersRepository);
  });

  it('1. Should be able to create a new user without: email, password and profile_photo.', async () => {
    // ? Arrange

    // ? Act
    const user = await createUserService.execute({
      name: 'Thiago Watanabe',
      phone: '+55675985791513',
    });

    // ? Assert
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Thiago Watanabe');
    expect(user.phone).toBe('+55675985791513');
  });
  it('2. Should be able to create a new user witht all fields', async () => {
    // ? Arrange

    // ? Act
    const user = await createUserService.execute({
      name: 'Thiago Watanabe',
      phone: '+55675985791513',
      email: 'email@test.com',
      password: 'password',
      profile_photo: 'teste',
    });

    // ? Assert
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Thiago Watanabe');
    expect(user.phone).toBe('+55675985791513');
  });
  it('3. Should throw Error when email conflict.', async () => {
    // ? Arrange
    await createUserService.execute({
      name: 'Thiago Watanabe',
      phone: '+999',
      email: 'duplicated@test.com',
    });
    // ? Act

    expect(
      createUserService.execute({
        name: 'Thiago Watanabe',
        phone: '+55675985791513',
        email: 'duplicated@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('4. Should throw Error when phone conflict.', async () => {
    // ? Arrange
    await createUserService.execute({
      name: 'Thiago Watanabe',
      phone: '+999',
    });
    // ? Act

    expect(
      createUserService.execute({
        name: 'Thiago Watanabe',
        phone: '+999',
        email: 'duplicated@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
