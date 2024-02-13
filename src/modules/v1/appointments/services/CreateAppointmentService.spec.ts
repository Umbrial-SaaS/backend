import "reflect-metadata"
import FakeIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/fakes/FakeIdGeneratorProvider';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';

import CreateAppointmentService from './CreateAppointmentService';
import FakeCorporationsRepository from '@modules/v1/corporations/repositories/fakes/FakeCorporationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { fakeCorporationId, fakeCorporationStaffId } from '@modules/v1/corporations/repositories/fakes/seeds';
import { fakeServiceId } from '@modules/v1/services/repositories/fakes/seeds';
import { fakeUserId } from '@modules/v1/users/repositories/fakes/seeds';

let createAppointmentService: CreateAppointmentService;
let fakeAppointmentsRepository: IAppointmentsRepository;
let fakeIdGeneratorProvider: IIdGeneratorProvider;
let fakeCorporationsRepository: FakeCorporationsRepository;
describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeIdGeneratorProvider = new FakeIdGeneratorProvider();
    fakeCorporationsRepository = new FakeCorporationsRepository();

    createAppointmentService = new CreateAppointmentService(fakeIdGeneratorProvider, fakeCorporationsRepository, fakeAppointmentsRepository);
  });

  it('1. Should be able to create a new user without: person info, email and password be encrypted.', async () => {
    // ? Arrange

    // ? Act
    const appointment = await createAppointmentService.execute({
      corporationId: fakeCorporationId,
      services: [{
        quantity: 1,
        serviceId: fakeServiceId,
      }],
      timestamp: new Date('10-10-2001'),
      userId: fakeUserId,
      corporationStaffId: fakeCorporationStaffId
    });

    // ? Assert 
    expect(appointment).toHaveProperty('id');
  });

});
