import FakeUsersRepository from '@modules/v1/users/repositories/fakes/FakeUsersRepository';
import FakeIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/fakes/FakeIdGeneratorProvider';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import CreateCorporationService from './CreateCorporationService';
import FakeCorporationsRepository from '../repositories/fakes/FakeCorporationsRepository';
import ICorporationsRepository from '../repositories/ICorporationsRepository';
import { fakeUser } from '@modules/v1/users/repositories/fakes/seeds';
import ICorporationStaffRepository from '../repositories/ICorporationStaffRepository';
import FakeCorporationStaffRepository from '../repositories/fakes/FakeCorporationStaffRepository';

let fakeUsersRepository: FakeUsersRepository;

let createCorporationService: CreateCorporationService;
let fakeCorporationsRepository: ICorporationsRepository;
let fakeCorporationStaffRepository: ICorporationStaffRepository;
let fakeIdGeneratorProvider: IIdGeneratorProvider;
describe('CreateCorporationService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCorporationsRepository = new FakeCorporationsRepository();
    fakeIdGeneratorProvider = new FakeIdGeneratorProvider();
    fakeCorporationStaffRepository = new FakeCorporationStaffRepository();

    createCorporationService = new CreateCorporationService(fakeCorporationsRepository, fakeUsersRepository, fakeIdGeneratorProvider, fakeCorporationStaffRepository);
  });

  it('1. Should be able to create a new user without: person info, email and password be encrypted.', async () => {
    // ? Arrange 
    const active = true
    const description = 'Description'
    const instagram = '@k9barbearia'
    const name = 'Barbearia K9'

    // ? Act
    const corporation = await createCorporationService.execute({
      userId: fakeUser.id,
      corporationData: {
        active,
        description,
        instagram,
        name
      }
    });

    // ? Assert
    expect(corporation.description).toBe(description);
    expect(corporation.name).toBe(name);
    expect(corporation.instagram).toBe(instagram);
  });

});
